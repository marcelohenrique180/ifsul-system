package br.com.ifsul.system.infrastructure.dao;

import br.com.ifsul.pojo.Role;
import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.infrastructure.database.dao.UsuarioDAO;
import br.com.ifsul.pojo.Usuario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class UsuarioDAOTest extends BaseDAOTest{

    @Autowired
    private UsuarioDAO usuarioDAO;

    @Test
    public void testFoundOne() {
        assertNotNull(usuarioDAO.findOne(1L));
    }

    @Test
    public void testExists() {
        assertTrue(usuarioDAO.exists(1L));
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    public void testSave() {
        Usuario usuario = new Usuario();
        usuario.setEmail("tt@test");
        usuario.setRole(new Role(1L));
        usuario.setSenha("123");
        assertEquals(usuarioDAO.save(usuario).getRole().getId(), new Long(1L));
    }
}
