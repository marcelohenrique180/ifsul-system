package br.com.ifsul.infrastructure.database.dao;


import br.com.ifsul.pojo.Curso;
import org.springframework.data.repository.CrudRepository;

public interface CursoDAO extends CrudRepository<Curso, Long> {
}
