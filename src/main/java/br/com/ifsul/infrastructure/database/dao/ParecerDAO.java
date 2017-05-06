package br.com.ifsul.infrastructure.database.dao;

import br.com.ifsul.pojo.Parecer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "pareceres", path = "pareceres")
public interface ParecerDAO extends CrudRepository<Parecer, Long> {

    Parecer findByRequerimentoId(@Param("id") Long id);
}
