package br.com.ifsul.application.service;

import br.com.ifsul.pojo.Usuario;
import br.com.ifsul.pojo.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;

@Service
public class SendConfirmEmail {

    private JavaMailSenderImpl mailSender;
    private String url;

    @Async
    public void enviar(final Usuario usuario, final VerificationToken token) throws IOException, MessagingException {
        MimeMessagePreparator preparator = mimeMessage -> {
            mimeMessage.setRecipient(Message.RecipientType.TO,
                    new InternetAddress(usuario.getEmail()));
            mimeMessage.setSubject("Email de Confirmação");
            mimeMessage.setFrom(new InternetAddress(mailSender.getHost(), "IFSul"));
            mimeMessage.setText("Para confirmar sua conta, clique no link a seguir: "+url+"/cadastro/aluno/" + token.getToken());
        };

        mailSender.send(preparator);
    }

    @Autowired
    public void setMailSender(JavaMailSenderImpl mailSender) {
        this.mailSender = mailSender;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
