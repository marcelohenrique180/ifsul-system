package br.com.ifsul.system.pojo;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Parecer {
    private @Id @GeneratedValue Long id;

    @NotNull
    @Size(max = 500)
    private String parecer;

    private Boolean deferido;

    @ManyToOne
    @JoinColumn(name = "id_requerimento")
    @NotNull
    private Requerimento requerimento;

    @ManyToOne
    @JoinColumn(name = "id_departamento")
    @NotNull
    private Departamento departamento;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParecer() {
        return parecer;
    }

    public void setParecer(String parecer) {
        this.parecer = parecer;
    }

    public Boolean getDeferido() {
        return deferido;
    }

    public void setDeferido(Boolean deferido) {
        this.deferido = deferido;
    }

    public  Departamento getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }

    public Requerimento getRequerimento() {
        return requerimento;
    }

    public void setRequerimento(Requerimento requerimento) {
        this.requerimento = requerimento;
    }
}
