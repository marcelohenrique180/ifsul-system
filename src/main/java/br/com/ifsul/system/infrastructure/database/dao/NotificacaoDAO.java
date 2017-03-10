package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Notificacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "notificacoes", collectionResourceRel = "notificacoes")
public interface NotificacaoDAO extends PagingAndSortingRepository<Notificacao, Long> {
}
