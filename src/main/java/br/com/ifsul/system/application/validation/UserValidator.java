package br.com.ifsul.system.application.validation;

import br.com.ifsul.system.application.service.UsuarioService;
import br.com.ifsul.system.pojo.Usuario;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;


public abstract class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Usuario user = (Usuario) o;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "NotEmpty");
        if (user.getEmail().length() < 6 || user.getEmail().length() > 236) {
            errors.rejectValue("email", "Size.userForm.email");
        }
        if (getUserService().buscarPorEmail(user.getEmail()) != null) {
            errors.rejectValue("email", "Duplicate.userForm.email");
        }

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "senha", "NotEmpty");
        if (user.getSenha().length() < 8 || user.getSenha().length() > 32) {
            errors.rejectValue("senha", "Size.userForm.senha");
        }
    }

    protected abstract UsuarioService getUserService();
}
