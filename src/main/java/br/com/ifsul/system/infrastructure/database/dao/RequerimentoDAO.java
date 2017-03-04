package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Requerimento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "requerimentos", path = "requerimentos")
public interface RequerimentoDAO extends CrudRepository<Requerimento, Long> {
}
