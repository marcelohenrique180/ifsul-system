package br.com.ifsul.system.infrastructure.dao;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.system.infrastructure.database.dao.RoleDAO;
import br.com.ifsul.system.pojo.Role;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

@DatabaseSetup(TestRoleDAO.DATASET)
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = { TestRoleDAO.DATASET })
public class TestRoleDAO extends BaseDAOTest{
    static final String DATASET = "classpath:datasets/dataset.xml";

    private RoleDAO roleDAO;

    @Autowired
    public void setRoleDAO(RoleDAO roleDAO) {
        Assert.notNull(roleDAO);
        this.roleDAO = roleDAO;
    }

    @Test
    public void testFoundOne() {
        assertNotNull(roleDAO.findOne(1L));
    }

    @Test
    public void testExists() {
        assertTrue(roleDAO.exists(1L));
    }

    @Test
    public void testSave() {
        Role role = new Role();
        role.setRoleName("TEST");
        assertNotNull(roleDAO.save(role));
    }

    @Test
    public void testUpdate() {
        Role role = new Role();
        role.setId(1L);
        role.setRoleName("TEST");
        assertEquals(roleDAO.save(role).getRoleName(), role.getRoleName());
    }

    @Test
    public void testCantSave() {
        Role role = new Role();
        role.setRoleName("ALUNO");
        try{
            roleDAO.save(role);
            assertFalse(true);
        }catch (Exception e){
            assertTrue(true);
        }
    }
}
