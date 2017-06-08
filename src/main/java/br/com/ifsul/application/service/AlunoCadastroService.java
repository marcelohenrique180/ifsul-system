package br.com.ifsul.application.service;

import br.com.ifsul.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.infrastructure.errorhandling.ApiError;
import br.com.ifsul.pojo.Aluno;
import br.com.ifsul.pojo.VerificationToken;
import br.com.ifsul.infrastructure.database.dao.AlunoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;

@Service
public class AlunoCadastroService {

    private AlunoDAO alunoDAO;
    private VerificationTokenDAO tokenDAO;
    private SendConfirmEmail sender;

    public void confirmarAluno(Aluno aluno){
        // verifica se aluno existe
        aluno = alunoDAO.findByMatricula(aluno.getMatricula());
        if (aluno == null){
            throw new ApiError(HttpStatus.NOT_FOUND, "Aluno não encontrado", "Aluno");
        }

        try {
            VerificationToken verificationToken;
            VerificationToken dbToken = tokenDAO.findTokenByUsuario(aluno.getUsuario().getEmail());

            // se token já existe
            if (dbToken != null){
                if (dbToken.isVerified()){
                    throw new ApiError(HttpStatus.BAD_REQUEST, "Usuário já cadastrado", "Aluno");
                }else{
                    // cria novo token e reenvia email
                    dbToken.renovar();
                    verificationToken = tokenDAO.save(dbToken);
                }
            } else {
                // cria novo token
                verificationToken = new VerificationToken(UUID.randomUUID().toString(), aluno.getUsuario());
                verificationToken = tokenDAO.save(verificationToken);
            }

            try {
                sender.enviar(aluno.getUsuario(), verificationToken);
            } catch (IOException e) {
                throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Não foi possível enviar e-mail", "Email");
            }
        }
        catch (ApiError e) {
            throw e;
        }
        catch (Exception e) {
            throw new ApiError(HttpStatus.NOT_FOUND, "Não foi possível criar Token", "Aluno");
        }
    }

    @Autowired
    public void setAlunoDAO(AlunoDAO alunoDAO) {
        this.alunoDAO = alunoDAO;
    }

    @Autowired
    public void setTokenDAO(VerificationTokenDAO tokenDAO) {
        this.tokenDAO = tokenDAO;
    }

    @Autowired
    public void setSender(SendConfirmEmail sender) {
        this.sender = sender;
    }
}
