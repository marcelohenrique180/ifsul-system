package br.com.ifsul.system.infrastructure.dao;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import junit.framework.TestCase;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

@TestExecutionListeners({
        DependencyInjectionTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class,
        WithSecurityContextTestExecutionListener.class
})
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
//@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/XXXX.xml")
public abstract class BaseDAOTest extends TestCase{
}
