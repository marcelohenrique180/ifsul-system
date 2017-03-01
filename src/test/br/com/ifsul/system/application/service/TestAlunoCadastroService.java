package br.com.ifsul.system.application.service;

import br.com.ifsul.system.infrastructure.database.dao.AlunoDAO;
import br.com.ifsul.system.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.system.infrastructure.errorhandling.ApiError;
import br.com.ifsul.system.pojo.Aluno;
import br.com.ifsul.system.pojo.Usuario;
import br.com.ifsul.system.pojo.VerificationToken;
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
public class TestAlunoCadastroService extends TestCase{

    @Autowired
    AlunoCadastroService service;

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
        service.setAlunoDAO(alunoDAO);
        service.setSender(sender);
        service.setTokenDAO(tokenDAO);

        aluno = new Aluno();
        aluno.setMatricula("12345");
    }

    @Test(expected = ApiError.class)
    public void testAlunoNaoEncontrado(){
        when(alunoDAO.findByMatricula(anyString())).thenReturn(null);

        service.cadastrarAluno(aluno);
    }

    @Test(expected = ApiError.class)
    public void testNaoConsegueCriarToken(){

        Usuario usuario = new Usuario();
        usuario.setEmail("123");

        aluno.setUsuario(usuario);
        when(alunoDAO.findByMatricula(anyString())).thenReturn(aluno);
        when(tokenDAO.save(any(VerificationToken.class))).thenThrow(new HibernateException(""));

        service.cadastrarAluno(aluno);
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

        service.cadastrarAluno(aluno);
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

        service.cadastrarAluno(aluno);
    }
}
