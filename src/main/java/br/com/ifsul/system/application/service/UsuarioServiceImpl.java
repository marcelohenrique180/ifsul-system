package br.com.ifsul.system.application.service;

import br.com.ifsul.system.infrastructure.database.dao.UsuarioDAO;
import br.com.ifsul.system.pojo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    protected UsuarioDAO usuarioDAO;

    @Override
    public final Usuario registrar(Usuario usuario) throws SQLException, ClassNotFoundException {
        return usuarioDAO.save(usuario);
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return usuarioDAO.findByEmail(email);
    }

    public UsuarioDAO getUsuarioDAO() {
        return usuarioDAO;
    }

    public void setUsuarioDAO(UsuarioDAO usuarioDAO){
        this.usuarioDAO = usuarioDAO;
    }
}
