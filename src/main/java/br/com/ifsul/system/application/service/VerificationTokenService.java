package br.com.ifsul.system.application.service;

import br.com.ifsul.system.application.validation.VerificationTokenValidator;
import br.com.ifsul.system.infrastructure.database.dao.VerificationTokenDAO;
import br.com.ifsul.system.infrastructure.errorhandling.ApiError;
import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class VerificationTokenService {

    private VerificationTokenDAO verificationTokenDAO;
    private VerificationTokenValidator validator;
    private BindingResult result;

    public VerificationTokenService(){}

    public VerificationTokenService(BindingResult result){
        setResult(result);
    }

    public VerificationToken verificar(String token) throws ApiError {
        VerificationToken verificationToken = verificationTokenDAO.findByToken(token);
        validator.validate(verificationToken, result);

        if (result.hasErrors()){
            throw new ApiError(HttpStatus.BAD_REQUEST, result.getAllErrors().get(0).getDefaultMessage(),"Erro ao Validar token");
        }
        return verificationToken;
    }

    public void remover(VerificationToken token){
        verificationTokenDAO.delete(token);
    }

    @Autowired
    public void setValidator(VerificationTokenValidator validator) {
        this.validator = validator;
    }

    public void setResult(BindingResult result) {
        this.result = result;
    }

    @Autowired
    public void setVerificationTokenDAO(VerificationTokenDAO verificationTokenDAO) {
        this.verificationTokenDAO = verificationTokenDAO;
    }
}
