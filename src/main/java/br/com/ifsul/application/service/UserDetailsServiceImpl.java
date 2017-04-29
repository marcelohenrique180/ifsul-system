package br.com.ifsul.application.service;

import br.com.ifsul.pojo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    private UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        Usuario user  = usuarioService.buscarPorEmail(email);
        if (user != null){

            grantedAuthorities.add(new SimpleGrantedAuthority(
                    user.getRole().getRoleName()
            ));
            return new User(user.getEmail(), user.getSenha(), grantedAuthorities);
        }else{
            throw new UsernameNotFoundException("Usuário não Encontrado no Banco");
        }
    }

    @Autowired
    public void setUsuarioService(UsuarioService usuarioService) {
        Assert.notNull(usuarioService, "Objeto "+ usuarioService + " nao deve ser null");
        this.usuarioService = usuarioService;
    }

    public UsuarioService getUsuarioService() {
        return usuarioService;
    }
}
