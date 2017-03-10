package br.com.ifsul.system.pojo;

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

    public Notificacao(String mensagem, Usuario usuario){
        this.mensagem = mensagem;
        this.usuario = usuario;
        this.recebida = false;
    }

    public Notificacao(){}

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
