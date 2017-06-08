package br.com.ifsul.system.api.controller;

import br.com.ifsul.api.controller.AlunoController;
import br.com.ifsul.application.service.AlunoCadastroService;
import br.com.ifsul.application.service.AlunoConfirmarService;
import br.com.ifsul.application.service.SendConfirmEmail;
import br.com.ifsul.infrastructure.errorhandling.ApiError;
import br.com.ifsul.infrastructure.errorhandling.GlobalErrorHandler;
import br.com.ifsul.pojo.Aluno;
import br.com.ifsul.pojo.Usuario;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.BindingResult;

import java.io.UnsupportedEncodingException;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AlunoControllerTest {

    // criar mock do serviço
    @Mock
    private AlunoConfirmarService alunoConfirmarService;

    @Mock
    private Authentication authentication;

    @Mock
    private AlunoCadastroService alunoCadastroService;

    @Mock
    SendConfirmEmail mockSender;

    // injetar no controller
    @InjectMocks
    private AlunoController controller;

    // MackMvc Property
    private MockMvc mvc;

    private MvcResult mvcResult;

    @Before
    public void setup() throws ApiError{
        MockitoAnnotations.initMocks(this);

        mvc = MockMvcBuilders
                .standaloneSetup(controller)
                .setControllerAdvice(new GlobalErrorHandler())
                .build();
    }

    @Test
    public void testCadastrarAluno() throws Exception {

        mvcResult = mvc.perform(post("/api/cadastro/aluno")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"matricula\": \"test\"}")
        )
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("\"matricula\":\"test\"")))
                .andReturn();
    }

    @Test
    public void testGetAlunoNotFound() throws Exception {
        when(authentication.getName()).thenReturn("outro@if");
        doThrow(new ApiError(HttpStatus.NOT_FOUND, "Aluno não encontrado", "Aluno")).when(alunoCadastroService).confirmarAluno(any(Aluno.class));

        mvcResult = mvc.perform(post("/api/cadastro/aluno")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"matricula\": \"test\"}")
        )
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Aluno não encontrado")))
        .andReturn();
    }

    @Test
    public void testPostAlunoTokenException() throws Exception {
        doThrow(new ApiError(HttpStatus.BAD_REQUEST, "erro", "teste")).when(alunoConfirmarService)
                .confirmarAluno(eq("token_errado"), any(Usuario.class), any(BindingResult.class));

        mvcResult = mvc.perform(post("/api/cadastro/aluno/usuario")
                .header("VerificationToken", "token_errado")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content("{\"nome\": \"foo\", \"rg\": \"234234\", \"dataNasc\": \"02/02/2000\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("erro")))
                .andReturn();
    }

    @After
    public void after(){
        if (mvcResult != null){
            try {
                System.out.println(
                        mvcResult.getResponse().getContentAsString()
                );
            } catch (UnsupportedEncodingException ignored) {

            }
        }
    }
}
