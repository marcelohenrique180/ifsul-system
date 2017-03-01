package br.com.ifsul.system.application.service;


import br.com.ifsul.system.pojo.Usuario;

import java.sql.SQLException;

public interface UsuarioService {
    Usuario registrar(Usuario usuario) throws SQLException, ClassNotFoundException;

    Usuario buscarPorEmail(String email);
}
