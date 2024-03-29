package br.com.ifsul.pojo;

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
    @ManyToOne
    @JoinColumn(name = "id_tipo")
    private Tipo tipo;

    @NotNull
    @Size(min = 1, max = 500)
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
    private Departamento departamentoAtual;

    @OneToOne(mappedBy = "requerimento")
    private Parecer parecer;

    public Requerimento(Long id) {
        this.id = id;
        setDataToNow();
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

    public String getRequerimento() {
        return requerimento;
    }

    public void setRequerimento(String requerimento) {
        this.requerimento = requerimento;
    }

    public String getData() {
        DateTimeFormatter dateTimeFormat = DateTimeFormat.forPattern("dd/MM/yyyy");
        return dateTimeFormat.print(data.getTime());
    }

    public void setData(String data) {
        DateTimeFormatter dateTimeFormat = DateTimeFormat.forPattern("dd/MM/yyyy");
        this.data = dateTimeFormat.parseDateTime(data).toDate();
    }
    public void setDataToNow() {
        this.data = DateTime.now().toDate();
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public Parecer getParecer() {
        return parecer;
    }

    public void setParecer(Parecer parecer) {
        this.parecer = parecer;
    }
}
