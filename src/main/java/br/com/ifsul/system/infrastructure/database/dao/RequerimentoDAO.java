package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Requerimento;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "requerimentos", path = "requerimentos")
public interface RequerimentoDAO extends PagingAndSortingRepository<Requerimento, Long> {
}
