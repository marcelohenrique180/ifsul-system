package br.com.ifsul.application.events;

import br.com.ifsul.api.jwt.AuthenticatedUser;
import br.com.ifsul.infrastructure.database.dao.DepartamentoDAO;
import br.com.ifsul.infrastructure.database.dao.RequerimentoDAO;
import br.com.ifsul.pojo.Departamento;
import br.com.ifsul.pojo.Parecer;
import br.com.ifsul.pojo.Requerimento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * @author Marcelo Henrique
 */
@Component
@RepositoryEventHandler(Parecer.class)
public class BeforeSaveParecer {

    @Autowired
    private DepartamentoDAO departamentoDAO;

    @Autowired
    private RequerimentoDAO requerimentoDAO;

    @HandleBeforeCreate
    public void handleBeforeCreate(Parecer parecer){
        AuthenticatedUser user = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication();
        String username = user.getName();

        Departamento departamentoDeferinte = departamentoDAO.findDepartamentoByUsuarioEmail(username);
        parecer.setDepartamento(departamentoDAO.findDepartamentoByUsuarioEmail(username));

        Requerimento requerimento = parecer.getRequerimento();
        requerimento.setDepartamentoDeferinte(departamentoDeferinte);

        requerimentoDAO.save(requerimento);
    }
}
