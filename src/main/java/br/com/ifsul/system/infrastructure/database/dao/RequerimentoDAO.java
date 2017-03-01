package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.Requerimento;
import org.springframework.data.repository.CrudRepository;

public interface RequerimentoDAO extends CrudRepository<Requerimento, Long> {
}
