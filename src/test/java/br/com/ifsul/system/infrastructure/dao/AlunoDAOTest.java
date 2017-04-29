package br.com.ifsul.system.infrastructure.dao;

import br.com.ifsul.infrastructure.database.dao.AlunoDAO;
import br.com.ifsul.pojo.Aluno;
import br.com.ifsul.pojo.Role;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.pojo.Curso;
import br.com.ifsul.pojo.Usuario;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class AlunoDAOTest extends BaseDAOTest{

    @Autowired
    private AlunoDAO alunoDAO;
    private Aluno aluno;

    @Override
    @Test
    @Before
    public void setUp() throws Exception {
        aluno = new Aluno();
        aluno.setdataNasc("10/10/9999");
        aluno.setNome("Marcelo");
        aluno.setRg("123456");
        aluno.setMatricula("DEF456");
        aluno.setCurso(new Curso(1L));
        aluno.setTelefone("1234-9989");
        Usuario usuario = new Usuario();
        usuario.setEmail("eu@mar");
        usuario.setSenha("secret");
        usuario.setRole(new Role(1L));

        aluno.setUsuario(usuario);
    }

    @Test
    public void testFoundOne() {
        assertNotNull(alunoDAO.findOne(1L));
    }

    @Test
    public void testExists() {
        assertTrue(alunoDAO.exists(1L));
    }

    @Test
    public void testSave() {
        assertNotNull(alunoDAO.save(aluno).getUsuario());
    }

    @Test
    public void testUpdate(){
        String newName = "NovoNome";

        Aluno aluno = alunoDAO.findOne(1L);
        aluno.setNome(newName);
        alunoDAO.save(aluno);
        Aluno atualizado = alunoDAO.findOne(1L);

        assertTrue( newName.equals(atualizado.getNome()) );
    }

    @Test
    public void testCantUpdate(){
        try{
            aluno.setUsuario(new Usuario(2L));
            alunoDAO.save(aluno);
            assertFalse(true);
        }catch (InvalidDataAccessApiUsageException success){
            assertTrue(true);
        }
    }


}
