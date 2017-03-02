package br.com.ifsul.system.infrastructure.database.dao;


import br.com.ifsul.system.pojo.Usuario;
import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;

public interface UsuarioDAO extends CrudRepository<Usuario, Long> {

    @RestResource(exported = false)
    Usuario findByEmail(@Param("email") String email) throws ResourceNotFoundException;

    Usuario save(Usuario usuario);
}
