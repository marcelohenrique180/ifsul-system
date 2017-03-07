package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Tipo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "tipos", collectionResourceRel = "tipos")
public interface TipoDAO extends CrudRepository<Tipo, Long> {
}
