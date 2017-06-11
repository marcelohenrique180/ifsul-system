package br.com.ifsul.application.events;

import br.com.ifsul.api.jwt.AuthenticatedUser;
import br.com.ifsul.infrastructure.database.dao.DepartamentoDAO;
import br.com.ifsul.pojo.Parecer;
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

    @HandleBeforeCreate
    public void handleBeforeCreate(Parecer parecer){
        AuthenticatedUser user = (AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication();
        String username = user.getName();
        parecer.setDepartamento(departamentoDAO.findDepartamentoByUsuarioEmail(username));
    }
}
