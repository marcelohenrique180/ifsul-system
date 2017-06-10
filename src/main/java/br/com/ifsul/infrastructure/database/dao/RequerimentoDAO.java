package br.com.ifsul.infrastructure.database.dao;

import br.com.ifsul.pojo.Requerimento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Set;


@RepositoryRestResource(collectionResourceRel = "requerimentos", path = "requerimentos")
public interface RequerimentoDAO extends PagingAndSortingRepository<Requerimento, Long> {

    @Query(value = "SELECT r FROM Requerimento r INNER JOIN r.aluno a INNER JOIN a.usuario u WHERE u.email = ?#{authentication.name}")
    Page<Requerimento> findAll(Pageable pageable);

    Set<Requerimento> findRequerimentosByParecerIsNull();
}
