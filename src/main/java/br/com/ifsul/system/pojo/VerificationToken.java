package br.com.ifsul.system.pojo;

import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class VerificationToken {
    private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String token;

    @OneToOne(targetEntity = Usuario.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "id_usuario")
    @NotNull
    private Usuario usuario;

    @NotNull
    private Date expiryDate;

    private Boolean verified;

    public VerificationToken() {
        this.expiryDate = calculateExpiryDate(EXPIRATION).toDate();
    }

    public VerificationToken(String token, Usuario usuario) {
        super();
        this.token = token;
        this.usuario = usuario;
        this.expiryDate = calculateExpiryDate(EXPIRATION).toDate();
        this.verified = false;
    }

    private DateTime calculateExpiryDate(int expiryTimeInMinutes) {
        DateTime cal = DateTime.now();
        cal.plusMinutes(expiryTimeInMinutes);
        return cal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public DateTime getExpiryDate() {
        return new DateTime(expiryDate);
    }

    public void setExpiryDate(DateTime expiryDate) {
        this.expiryDate = expiryDate.toDate();
    }

    public Boolean isVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }
}
