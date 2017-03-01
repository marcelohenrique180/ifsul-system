package br.com.ifsul.system.infrastructure.database.dao;


import br.com.ifsul.system.pojo.Curso;
import org.springframework.data.repository.CrudRepository;

public interface CursoDAO extends CrudRepository<Curso, Long> {
}
