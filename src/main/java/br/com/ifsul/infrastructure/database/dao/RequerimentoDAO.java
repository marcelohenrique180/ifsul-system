package br.com.ifsul.infrastructure.database.dao;

import br.com.ifsul.pojo.Requerimento;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "requerimentos", path = "requerimentos")
public interface RequerimentoDAO extends PagingAndSortingRepository<Requerimento, Long> {
}
