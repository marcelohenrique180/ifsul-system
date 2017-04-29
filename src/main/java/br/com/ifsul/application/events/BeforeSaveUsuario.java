package br.com.ifsul.application.events;

import br.com.ifsul.application.service.SendConfirmEmail;
import br.com.ifsul.pojo.VerificationToken;
import br.com.ifsul.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.pojo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RepositoryEventHandler(Usuario.class)
public class BeforeSaveUsuario {

    private SendConfirmEmail sender;
    private VerificationToken verificationToken;
    private VerificationTokenDAO verificationTokenDAO;

    @HandleBeforeCreate
    public void beforeCreate(Usuario usuario) {
        System.out.println("Vai criar " + usuario.getEmail() + " com permissão de " + usuario.getRole().getRoleName());
        try{
            verificationToken =
                    new VerificationToken(UUID.randomUUID().toString(), usuario);

            sender.enviar(usuario, verificationToken);
        }catch (Exception err) {
            err.printStackTrace();
            throw new MailSendException("Não foi possível enviar email.");
        }
    }

    @HandleAfterCreate
    public void afterCreate(Usuario usuario) {
        verificationTokenDAO.save(verificationToken);
    }

    @Autowired
    public void setSender(SendConfirmEmail sender) {
        this.sender = sender;
    }

    @Autowired
    public void setVerificationTokenDAO(VerificationTokenDAO verificationTokenDAO) {
        this.verificationTokenDAO = verificationTokenDAO;
    }
}