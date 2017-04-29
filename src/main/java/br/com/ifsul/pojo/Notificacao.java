package br.com.ifsul.pojo;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Notificacao {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(max = 200)
    private String mensagem;

    @Size(max = 100)
    private String link;

    @NotNull
    @Size(max = 7)
    private String color;

    @NotNull
    private Boolean recebida;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Boolean getRecebida() {
        return recebida;
    }

    public void setRecebida(Boolean recebida) {
        this.recebida = recebida;
    }

    public Notificacao(String mensagem, Usuario usuario, String color, String link){
        this.mensagem = mensagem;
        this.usuario = usuario;
        this.link = link;
        this.color = color;
        this.recebida = false;
    }

    public Notificacao(String mensagem, Usuario usuario, String color){
        this.mensagem = mensagem;
        this.usuario = usuario;
        this.color = color;
        this.recebida = false;
    }

    public Notificacao(){}

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
