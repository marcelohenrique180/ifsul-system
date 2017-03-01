package br.com.ifsul.system.pojo;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class Requerimento {
    private @GeneratedValue @Id Long id;

    @NotNull
    @Size(min = 1, max = 500)
    private String justificativa;

    @NotNull
    @Size(min = 1, max = 50)
    private String tipo;

    @NotNull
    @Size(min = 1, max = 80)
    private String requerimento;

    @Temporal(TemporalType.DATE)
    @NotNull
    private Date data;

    @ManyToOne
    @JoinColumn(name = "id_aluno")
    @NotNull
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "id_departamento_deferinte")
    private Departamento departamentoDeferinte;

    @ManyToOne
    @JoinColumn(name = "id_departamento_atual")
    @NotNull
    private Departamento departamentoAtual;

    public Requerimento(Long id) {
        this.id = id;
        data = DateTime.now().toDate();
    }

    public Requerimento() {
        data = DateTime.now().toDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Departamento getDepartamentoDeferinte() {
        return departamentoDeferinte;
    }

    public void setDepartamentoDeferinte(Departamento departamentoDeferinte) {
        this.departamentoDeferinte = departamentoDeferinte;
    }

    public Departamento getDepartamentoAtual() {
        return departamentoAtual;
    }

    public void setDepartamentoAtual(Departamento departamentoAtual) {
        this.departamentoAtual = departamentoAtual;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getRequerimento() {
        return requerimento;
    }

    public void setRequerimento(String requerimento) {
        this.requerimento = requerimento;
    }

    public Date getData() {
        return data;
    }

    public void setData(String data) {
        DateTimeFormatter dateTimeFormat = DateTimeFormat.forPattern("dd/MM/yyyy");
        this.data = dateTimeFormat.parseDateTime(data).toDate();
    }
}
