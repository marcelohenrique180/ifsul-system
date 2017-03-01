package br.com.ifsul.system.infrastructure.dao;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.junit.Before;
import org.junit.Test;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class TestParcerDAO extends BaseDAOTest{

    @Override
    @Before
    @Test
    public void setUp() throws Exception {
        super.setUp();
    }
}
