package br.com.ifsul.system.infrastructure.rest;

import br.com.ifsul.system.infrastructure.dao.BaseDAOTest;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.UnsupportedEncodingException;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@DatabaseSetup(value = "classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class NotificacaoAPITest extends BaseDAOTest {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    private MvcResult mvcResult;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    @WithMockUser(username = "teste@teste")
    public void requestNotificacoes() throws Exception {

        mvcResult = mvc.perform(get("/api/notificacoes/search/findAllNotRead")
                .contentType(MediaType.APPLICATION_JSON)
        )
                .andExpect(status().isOk())
                 .andExpect(content().string(containsString("sim"))).andReturn();

    }

    @After
    public void after(){
        if (mvcResult != null){
            try {
                System.out.println(
                        mvcResult.getResponse().getContentAsString()
                );
            } catch (UnsupportedEncodingException ignored) {}
        }
    }
}
