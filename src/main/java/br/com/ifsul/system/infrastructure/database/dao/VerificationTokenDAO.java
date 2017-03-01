package br.com.ifsul.system.infrastructure.database.dao;

import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface VerificationTokenDAO extends CrudRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);

    @Query("select v from VerificationToken as v left join v.usuario u where u.email = :#{#email}")
    VerificationToken findTokenByUsuario(@Param("email") String email);
}
