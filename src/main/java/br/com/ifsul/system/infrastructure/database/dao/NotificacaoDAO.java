package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Notificacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "notificacoes", collectionResourceRel = "notificacoes")
public interface NotificacaoDAO extends PagingAndSortingRepository<Notificacao, Long> {

    @Override
    Notificacao findOne(Long aLong);

    @Override
    Page<Notificacao> findAll(Pageable pageable);

    @Query("select n from Notificacao n inner join n.usuario u where n.recebida = false and u.email = ?#{authentication.name}")
    Page<Notificacao> findAllNotRead(Pageable pageable);

}
