package br.com.ifsul.infrastructure.database.dao;

import br.com.ifsul.pojo.Tipo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "tipos", collectionResourceRel = "tipos")
public interface TipoDAO extends CrudRepository<Tipo, Long> {
}
