package br.com.ifsul.system.api.controller;

import br.com.ifsul.system.application.service.AlunoCadastroService;
import br.com.ifsul.system.application.service.VerificationTokenService;
import br.com.ifsul.system.infrastructure.dao.BaseDAOTest;
import br.com.ifsul.system.infrastructure.database.dao.AlunoDAO;
import br.com.ifsul.system.infrastructure.errorhandling.ApiError;
import br.com.ifsul.system.pojo.Aluno;
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
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.UnsupportedEncodingException;

import static org.mockito.BDDMockito.*;
import static org.hamcrest.Matchers.containsString;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TestAlunoController extends BaseDAOTest{

    // criar mock do serviço
    @Mock
    VerificationTokenService mockVerificationTokenService;

    @Mock
    AlunoDAO mockAlunoDAO;

    @Mock
    Authentication authentication;

    @Mock
    AlunoCadastroService alunoCadastroService;

    // injetar no controller
    @InjectMocks
    AlunoController controller;

    // MackMvc Property
    private MockMvc mvc;

    private MvcResult mvcResult;

    @Before
    public void setup() throws ApiError{
        MockitoAnnotations.initMocks(this);
        controller.setVerificationTokenService(mockVerificationTokenService);
        controller.setAlunoDAO(mockAlunoDAO);
        controller.setCadastroService(alunoCadastroService);

        mvc = MockMvcBuilders
                .standaloneSetup(controller)
                .build();

        /* Setup Properties
        Usuario usuario = new Usuario(1L);

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUsuario(usuario);
        verificationToken.setId(1L);

        when(mockAlunoDAO.save(any(Aluno.class)))
                .then(new Answer<Aluno>() {
                    @Override
                    public Aluno answer(InvocationOnMock invocationOnMock) throws Throwable {
                        Aluno aluno = (Aluno) invocationOnMock.getArguments()[0];
                        aluno.setId(1L);
                        return aluno;
                    }
                });

        when(mockVerificationTokenService.verificar("123")).thenReturn(verificationToken); */
    }

    @Test
    public void testCadastrarAluno() throws Exception {
        doAnswer(invocationOnMock -> (Aluno) invocationOnMock.getArguments()[0]).when(alunoCadastroService).confirmarAluno(any(Aluno.class));

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

        mvcResult = mvc.perform(get("/api/aluno").with(SecurityMockMvcRequestPostProcessors.authentication(authentication)))
                .andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Aluno não encontrado")))
        .andReturn();
    }

    @Test
    public void testGetAluno() throws Exception {
        when(authentication.getName()).thenReturn("teste1@if");
        when(mockAlunoDAO.findAlunobyUsuarioEmail()).thenReturn(new Aluno(1L));

        mvcResult = mvc.perform(get("/api/aluno").with(SecurityMockMvcRequestPostProcessors.authentication(authentication)))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("\"id\":1")))
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

    //@Test
    public void testPostAlunoTokenException() throws Exception {
        when(mockVerificationTokenService.verificar("token_errado"))
                .thenThrow(new ApiError(HttpStatus.BAD_REQUEST, "erro", "teste"));

        mvc.perform(post("/api/aluno")
                .header("VerificationToken", "token_errado")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .content("{\"nome\": \"foo\", \"rg\": \"234234\", \"dataNasc\": \"02/02/2000\"}"))
                .andExpect(status().isBadRequest());
    }
}
