package br.com.ifsul.system.infrastructure.dao;

import br.com.ifsul.infrastructure.database.dao.DepartamentoDAO;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.infrastructure.database.dao.UsuarioDAO;
import br.com.ifsul.pojo.Departamento;
import br.com.ifsul.pojo.Usuario;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class DepartamentoDAOTest extends BaseDAOTest{
    @Autowired
    private DepartamentoDAO departamentoDAO;
    @Autowired
    private UsuarioDAO usuarioDAO;
    private Departamento departamento;

    @Override
    @Before
    @Test
    public void setUp() throws Exception {
        departamento = new Departamento();
        departamento.setNome("UNISINOS");
        departamento.setUsuario(usuarioDAO.findOne(3L));
    }

    @Test
    public void testFoundOne() {
        assertNotNull(departamentoDAO.findOne(1L));
    }

    @Test
    public void testExists() {
        assertTrue(departamentoDAO.exists(1L));
    }

    @Test
    public void testSave() {
        assertNotNull(departamentoDAO.save(departamento));
    }

    @Test
    public void testUpdate() {
        String newName = "UNISINOS - RS";
        Departamento departamento = departamentoDAO.findOne(1L);
        departamento.setNome(newName);
        assertTrue(departamentoDAO.save(departamento).getNome().equals(newName));
    }

    @Test
    public void testCantSave() {
        try{
            departamento.setUsuario(new Usuario(2L));
            departamentoDAO.save(departamento);
            assertFalse(true);
        }catch (DataIntegrityViolationException success){
            assertTrue(true);
        }
    }
}
