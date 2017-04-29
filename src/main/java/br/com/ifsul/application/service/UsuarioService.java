package br.com.ifsul.application.service;


import br.com.ifsul.pojo.Usuario;

import java.sql.SQLException;

public interface UsuarioService {
    Usuario registrar(Usuario usuario) throws SQLException, ClassNotFoundException;

    Usuario buscarPorEmail(String email);
}
