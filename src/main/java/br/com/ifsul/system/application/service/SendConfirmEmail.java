package br.com.ifsul.system.application.service;

import br.com.ifsul.system.pojo.Usuario;
import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class SendConfirmEmail {

    private MailSender mailSender;

    @Async
    public void enviar(final Usuario usuario, final VerificationToken token) throws MailException, IOException {
        SimpleMailMessage mail = getMail();
        mail.setTo(usuario.getEmail());

        mail.setSubject("Email de Confirmação");
        mail.setText("Para confirmar sua conta clique no link a seguir: http://localhost:8080/confirm?token=" + token.getToken());

        mailSender.send(mail);
    }

    @Autowired
    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public SimpleMailMessage getMail() {
        return new SimpleMailMessage();
    }
}
