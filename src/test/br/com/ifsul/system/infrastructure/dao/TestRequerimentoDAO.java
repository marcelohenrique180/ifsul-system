package br.com.ifsul.system.infrastructure.dao;

import com.github.springtestdbunit.annotation.DatabaseOperation;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import br.com.ifsul.system.infrastructure.database.dao.RequerimentoDAO;
import br.com.ifsul.system.pojo.Aluno;
import br.com.ifsul.system.pojo.Departamento;
import br.com.ifsul.system.pojo.Requerimento;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintViolationException;

@DatabaseSetup("classpath:datasets/dataset.xml")
@DatabaseTearDown(type = DatabaseOperation.DELETE_ALL, value = "classpath:datasets/dataset.xml")
public class TestRequerimentoDAO extends BaseDAOTest {

    @Autowired
    private RequerimentoDAO requerimentoDAO;
    private Requerimento requerimento;

    @Before
    @Test
    public void setUp() throws Exception {
        requerimento = new Requerimento();
        requerimento.setJustificativa("teste");
        requerimento.setRequerimento("teste");
        requerimento.setTipo("teste");
        requerimento.setAluno(new Aluno(2L));
        requerimento.setDepartamentoAtual(new Departamento(1L));
        requerimento.setDepartamentoDeferinte(new Departamento(1L));
    }

    @Test
    public void testSave(){
        requerimentoDAO.save(requerimento);
    }

    @Test(expected = ConstraintViolationException.class)
    public void testCantSaveRequerimentoJustificativa(){
        String big = "*";
        while (big.length() <= 500){
            big = big + "*";
        }

        requerimento.setJustificativa(big);
        requerimentoDAO.save(requerimento);
    }

    @Test(expected = ConstraintViolationException.class)
    public void testCantSaveRequerimentoJustificativaNula(){
        requerimento.setJustificativa(null);
        requerimentoDAO.save(requerimento);
    }

    @Test(expected = ConstraintViolationException.class)
    public void testCantSaveRequerimentoJustificativaSmall(){
        requerimento.setJustificativa("");
        requerimentoDAO.save(requerimento);
    }
}
