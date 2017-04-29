package br.com.ifsul.application.validation;

import br.com.ifsul.pojo.VerificationToken;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class VerificationTokenValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return VerificationToken.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        VerificationToken token = (VerificationToken) o;

        if(token != null){
            if (token.isVerified()){
                errors.reject("token", "Esse token já foi utilizado");
            }
            if (token.getExpiryDate().isBeforeNow()){
                errors.reject("token", "Esse token expirou");
            }
        }else{
            errors.reject("token", "Token não existe");
        }
    }
}
