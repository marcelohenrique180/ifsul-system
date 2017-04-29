package br.com.ifsul.pojo;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Tipo {
    private @Id
    @GeneratedValue
    Long id;

    @Column(unique = true)
    @NotNull
    @Size(min = 1, max = 50)
    private String tipo;

    @ManyToMany
    @JoinTable(name="departamento_tipo",
            joinColumns={@JoinColumn(name="id_tipo")},
            inverseJoinColumns={@JoinColumn(name="id_departamento")})
    private Set<Departamento> departamentos;

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tipo(){}

    public Tipo(Long id){
        this.id = id;
    }

    public Set<Departamento> getDepartamentos() {
        return departamentos;
    }

    public void setDepartamentos(Set<Departamento> departamento) {
        this.departamentos = departamento;
    }
}
