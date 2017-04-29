package br.com.ifsul.system.infrastructure.dao;

import br.com.ifsul.infrastructure.database.dao.VerificationTokenDAO;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.pojo.Usuario;
import br.com.ifsul.pojo.VerificationToken;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;

import javax.validation.ConstraintViolationException;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
@ContextConfiguration
@TestExecutionListeners(listeners={ServletTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class})
public class VerificationDAOTest extends BaseDAOTest {

    @Autowired
    private VerificationTokenDAO verificationTokenDAO;
    private VerificationToken token;

    @Override
    @Test
    @Before
    public void setUp() throws Exception {
        token = new VerificationToken();
        token.setVerified(null);
        token.setUsuario(new Usuario(2L));
        token.setToken("heuheueheuheueheueh");
    }

    @Test
    @WithMockUser
    public void testFindTokenByUsuario(){
        token = verificationTokenDAO.findTokenByUsuario("teste1@if");
        assertNotNull(token);
    }

    @Test
    public void testSave(){
        verificationTokenDAO.save(token);
    }

    @Test(expected = ConstraintViolationException.class)
    public void testCantSaveNullUsuario(){
        token.setUsuario(null);
        verificationTokenDAO.save(token);
    }
}
