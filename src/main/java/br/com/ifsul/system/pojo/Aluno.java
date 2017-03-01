package br.com.ifsul.system.pojo;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "aluno")
public class Aluno {
    private @Id @GeneratedValue Long id;

    @NotNull
    @Size(max = 80)
    private String nome;

    @NotNull
    @Size(min = 5, max = 15)
    private String rg;

    @Temporal(TemporalType.DATE)
    @NotNull
    private Date dataNasc;

    @NotNull
    @Size(max = 20)
    private String matricula;

    /*
    *  @Pattern(regexp = "(\\(([0-9]{2}|[0-9]{3})\\))?([0-9]{4}|[0-9]{5})-[0-9]{4}", message = "Telefone Inválido")
    *  Para uma futura implementação
    * */

    @NotNull
    @Size(max = 30)
    private String telefone;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne(optional = false)
    @JoinColumn(name = "id_curso")
    @NotNull
    private Curso curso;

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

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public Date getDataNasc() {
        return dataNasc;
    }

    public void setdataNasc(String dataNasc) {
        DateTimeFormatter formatter = DateTimeFormat.forPattern("dd/MM/yyyy");
        this.dataNasc = formatter.parseDateTime(dataNasc).toDate();
    }

    public Aluno(){}

    public Aluno(Long id){
        setId(id);
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }
}
