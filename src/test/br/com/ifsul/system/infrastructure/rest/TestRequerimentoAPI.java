package br.com.ifsul.system.infrastructure.rest;

import br.com.ifsul.system.application.events.BeforeSaveRequerimento;
import br.com.ifsul.system.infrastructure.dao.BaseDAOTest;
import br.com.ifsul.system.infrastructure.database.dao.NotificacaoDAO;
import br.com.ifsul.system.pojo.Notificacao;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.UnsupportedEncodingException;

import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DatabaseSetup(value = "classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class TestRequerimentoAPI extends BaseDAOTest{

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private BeforeSaveRequerimento requerimentoListener;

    @Mock
    private NotificacaoDAO notificacaoDAO;

    private MockMvc mvc;

    private MvcResult mvcResult;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();

        requerimentoListener.setNotificacaoDAO(notificacaoDAO);
    }

    @Test
    public void sendRequerimento() throws Exception {

        mvcResult = mvc.perform(post("/api/requerimentos")
                .content("{ \"tipo\": \"/api/tipo/1\", \"justificativa\": \"good to go\", \"requerimento\": \"good to goto\", \"aluno\": \"/api/aluno/1\"}")
                .contentType(MediaType.APPLICATION_JSON)
        ).andReturn();

        verify(notificacaoDAO, times(1)).save(any(Notificacao.class));
    }

    @Test
    public void sendRequerimentoInvalidTipo() throws Exception {

        mvcResult = mvc.perform(post("/api/requerimentos")
                .content("{ \"tipo\": \"/api/tipo/99999\", \"justificativa\": \"good to go\", \"requerimento\": \"good to goto\", \"aluno\": \"/api/aluno/1\"}")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isBadRequest()).andReturn();

        verify(notificacaoDAO, never()).save(any(Notificacao.class));
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
