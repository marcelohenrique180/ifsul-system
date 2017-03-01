package br.com.ifsul.system.infrastructure.database.dao;


import br.com.ifsul.system.pojo.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;

public interface RoleDAO  extends CrudRepository<Role, Long> {
    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Iterable<Role> findAll();
}
