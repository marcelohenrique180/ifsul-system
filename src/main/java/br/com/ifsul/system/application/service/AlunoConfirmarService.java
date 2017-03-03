package br.com.ifsul.system.application.service;

import br.com.ifsul.system.infrastructure.database.dao.UsuarioDAO;
import br.com.ifsul.system.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.system.pojo.Usuario;
import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class AlunoConfirmarService {

    private UsuarioDAO usuarioDAO;
    private VerificationTokenDAO tokenDAO;
    private VerificationTokenService verificationTokenService;
    private BCryptPasswordEncoder encoder;


    public void confirmarAluno(String token, Usuario usuario, BindingResult errors){
        verificationTokenService.setResult(errors);
        VerificationToken tokenFromDB = verificationTokenService.verificar(token);
        tokenFromDB.getUsuario().setSenha(encoder.encode(usuario.getSenha()));

        usuarioDAO.save(tokenFromDB.getUsuario());
        tokenFromDB.setVerified(true);
        tokenDAO.save(tokenFromDB);
    }

    @Autowired
    public void setUsuarioDAO(UsuarioDAO usuarioDAO) {
        this.usuarioDAO = usuarioDAO;
    }

    @Autowired
    public void setTokenDAO(VerificationTokenDAO tokenDAO) {
        this.tokenDAO = tokenDAO;
    }

    @Autowired
    public void setVerificationTokenService(VerificationTokenService verificationTokenService) {
        this.verificationTokenService = verificationTokenService;
    }

    @Autowired
    public void setEncoder(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }
}
