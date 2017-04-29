package br.com.ifsul.infrastructure.database.dao;


import br.com.ifsul.pojo.Aluno;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "alunos", path = "alunos")
public interface AlunoDAO extends CrudRepository<Aluno, Long> {

    @Query("select a from Aluno as a left join a.usuario u where u.email = ?#{authentication.name}")
    Aluno findAlunobyUsuarioEmail();

    @Query("select a from Aluno as a where a.matricula = :#{#matricula}")
    Aluno findByMatricula(@Param("matricula") String matricula);
}
