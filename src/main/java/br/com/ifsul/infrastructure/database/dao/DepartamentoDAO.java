package br.com.ifsul.infrastructure.database.dao;

import br.com.ifsul.pojo.Departamento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "departamentos", path = "departamentos")
public interface DepartamentoDAO extends CrudRepository<Departamento, Long> {
}
