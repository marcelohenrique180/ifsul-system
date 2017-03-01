package br.com.ifsul.system.infrastructure.dao;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.system.infrastructure.database.dao.CursoDAO;
import br.com.ifsul.system.pojo.Curso;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class TestCursoDAO extends BaseDAOTest {

    @Autowired
    private CursoDAO cursoDAO;

    @Test
    public void testFoundOne() {
        assertNotNull(cursoDAO.findOne(1L));
    }

    @Test
    public void testExists() {
        assertTrue(cursoDAO.exists(1L));
    }

    @Test
    public void testSave() {
        Curso curso = new Curso();
        curso.setNome("Eventos");
        assertNotNull(cursoDAO.save(curso));
    }
}
