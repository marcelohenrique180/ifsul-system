package br.com.ifsul.system.application.service;

import br.com.ifsul.application.service.AlunoCadastroService;
import br.com.ifsul.application.service.SendConfirmEmail;
import br.com.ifsul.infrastructure.database.dao.AlunoDAO;
import br.com.ifsul.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.infrastructure.errorhandling.ApiError;
import br.com.ifsul.pojo.Aluno;
import br.com.ifsul.pojo.Usuario;
import br.com.ifsul.pojo.VerificationToken;
import junit.framework.TestCase;
import org.hibernate.HibernateException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.BDDMockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AlunoCadastroServiceTest extends TestCase{

    @Autowired
    private AlunoCadastroService service;

    @Mock
    private AlunoDAO alunoDAO;
    @Mock
    private VerificationTokenDAO tokenDAO;
    @Mock
    private SendConfirmEmail sender;

    private Aluno aluno;

    @Override
    @Before
    public void setUp() throws Exception {
        super.setUp();
        service.setAlunoDAO(alunoDAO);
        service.setSender(sender);
        service.setTokenDAO(tokenDAO);

        aluno = new Aluno();
        aluno.setMatricula("12345");
    }

    @Test(expected = ApiError.class)
    public void testAlunoNaoEncontrado(){
        when(alunoDAO.findByMatricula(anyString())).thenReturn(null);

        service.confirmarAluno(aluno);
    }

    @Test(expected = ApiError.class)
    public void testNaoConsegueCriarToken(){

        Usuario usuario = new Usuario();
        usuario.setEmail("123");

        aluno.setUsuario(usuario);
        when(alunoDAO.findByMatricula(anyString())).thenReturn(aluno);
        when(tokenDAO.save(any(VerificationToken.class))).thenThrow(new HibernateException(""));

        service.confirmarAluno(aluno);
    }

    @Test(expected = ApiError.class)
    public void testCriarTokenJaCadastrado(){

        Usuario usuario = new Usuario();
        usuario.setEmail("123");
        VerificationToken token = new VerificationToken();
        token.setVerified(true);

        aluno.setUsuario(usuario);
        when(alunoDAO.findByMatricula(anyString())).thenReturn(aluno);
        when(tokenDAO.findTokenByUsuario(anyString())).thenReturn(token);

        service.confirmarAluno(aluno);
    }

    @Test
    public void testCriarToken(){

        Usuario usuario = new Usuario();
        usuario.setEmail("123");
        VerificationToken token = new VerificationToken();
        token.setVerified(false);

        aluno.setUsuario(usuario);
        when(alunoDAO.findByMatricula(anyString())).thenReturn(aluno);
        when(tokenDAO.findTokenByUsuario(anyString())).thenReturn(token);

        service.confirmarAluno(aluno);
    }
}
