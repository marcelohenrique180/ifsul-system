package br.com.ifsul.application.events;

import br.com.ifsul.infrastructure.database.dao.NotificacaoDAO;
import br.com.ifsul.infrastructure.errorhandling.ApiError;
import br.com.ifsul.pojo.Notificacao;
import br.com.ifsul.pojo.Requerimento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Requerimento.class)
public class BeforeSaveRequerimento {

    private NotificacaoDAO notificacaoDAO;

    @HandleBeforeCreate
    public void beforeCreate(Requerimento requerimento){
        requerimento.setDataToNow();
    }

    @HandleAfterCreate
    public void afterCreate(Requerimento requerimento){
        try {
            //Notifica todos os departamentos do novo requerimento
            requerimento.getTipo().getDepartamentos().forEach(departamento ->
                    notificacaoDAO.save(new Notificacao("Novo Requerimento do tipo " + requerimento.getTipo().getTipo() + " foi feito.", departamento.getUsuario(), "#D8D8EF", "/requerimento/"+requerimento.getId()))
            );
        } catch (Exception e) {
            e.printStackTrace();
            throw new ApiError(HttpStatus.BAD_REQUEST, "Houve algo de errado com seu pedido", "Erro");
        }
    }

    @Autowired
    public void setNotificacaoDAO(NotificacaoDAO notificacaoDAO) {
        this.notificacaoDAO = notificacaoDAO;
    }

}
