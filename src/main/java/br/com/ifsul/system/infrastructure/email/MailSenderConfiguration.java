package br.com.ifsul.system.infrastructure.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessagePreparator;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Configuration
@PropertySource(value = "classpath:/email.properties")
public class MailSenderConfiguration {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.port}")
    private String port;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    private Properties props;

    @Bean
    public JavaMailSenderImpl mailSender(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setJavaMailProperties(props);
        mailSender.setHost(host);
        mailSender.setPort(Integer.parseInt(port));
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        return mailSender;
    }

    Properties getProps(){
        Properties props = new Properties();
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.starttls.required", "true");
        return  props;
    }

    MailSenderConfiguration(){
        this.props = getProps();
    }
}
