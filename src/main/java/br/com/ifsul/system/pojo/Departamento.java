package br.com.ifsul.system.pojo;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "departamento")
public class Departamento {
    private @Id @GeneratedValue Long id;

    @NotNull
    @Column(unique = true)
    private String nome;

    @OneToOne
    @JoinColumn(name = "id_usuario", unique = true)
    private Usuario usuario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Departamento(){}

    public Departamento(Long id){
        this.id = id;
    }
}
