package br.com.ifsul.system.application.events;

import br.com.ifsul.system.infrastructure.database.dao.NotificacaoDAO;
import br.com.ifsul.system.infrastructure.database.dao.TipoDAO;
import br.com.ifsul.system.infrastructure.errorhandling.ApiError;
import br.com.ifsul.system.pojo.Departamento;
import br.com.ifsul.system.pojo.Notificacao;
import br.com.ifsul.system.pojo.Requerimento;
import br.com.ifsul.system.pojo.Tipo;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Component
@RepositoryEventHandler(Requerimento.class)
public class BeforeSaveRequerimento {

    private NotificacaoDAO notificacaoDAO;

    @HandleBeforeCreate
    public void beforeCreate(Requerimento requerimento){
        try {
            requerimento.setDataToNow();

            //Notifica todos os departamentos do novo requerimento
            requerimento.getTipo().getDepartamentos().forEach(departamento ->
                    notificacaoDAO.save( new Notificacao("Novo Requerimento do tipo "+ requerimento.getTipo().getTipo()+ " foi feito.", departamento.getUsuario()) )
            );
        } catch (Exception e) {
            throw new ApiError(HttpStatus.BAD_REQUEST, "Houve algo de errado com seu pedido", "Erro");
        }

    }

    @Autowired
    public void setNotificacaoDAO(NotificacaoDAO notificacaoDAO) {
        this.notificacaoDAO = notificacaoDAO;
    }

}
