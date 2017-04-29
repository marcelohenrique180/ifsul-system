package br.com.ifsul.infrastructure.database.dao;


import br.com.ifsul.pojo.Usuario;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

public interface UsuarioDAO extends CrudRepository<Usuario, Long> {

    @RestResource(exported = false)
    Usuario findByEmail(@Param("email") String email) throws ResourceNotFoundException;

    Usuario save(Usuario usuario);
}
