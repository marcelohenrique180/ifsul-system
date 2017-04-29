package br.com.ifsul.api.controller;

import br.com.ifsul.application.service.AlunoCadastroService;
import br.com.ifsul.application.service.AlunoConfirmarService;
import br.com.ifsul.application.service.SendConfirmEmail;
import br.com.ifsul.infrastructure.errorhandling.ApiError;
import br.com.ifsul.pojo.Aluno;
import br.com.ifsul.pojo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AlunoController {

    private AlunoCadastroService cadastroService;
    private AlunoConfirmarService confirmarService;

    @Value("${spring.local.host}")
    private String url;
    private SendConfirmEmail sender;


    @RequestMapping(value = "/api/cadastro/aluno", method = RequestMethod.POST)
    public Aluno cadastrarAluno(@RequestBody Aluno aluno){
        sender.setUrl(url);
        cadastroService.setSender(sender);
        cadastroService.confirmarAluno(aluno);
        return aluno;
    }

    @RequestMapping(value = "/api/cadastro/aluno/usuario", method = RequestMethod.POST)
    public Usuario cadastrarAlunoUsuario(@RequestBody Usuario usuario, HttpServletRequest request, BindingResult errors){
        String token = request.getHeader("VerificationToken");

        confirmarService.confirmarAluno(token, usuario, errors);
        return usuario;
    }

    @ExceptionHandler({ ApiError.class })
    public Map<String, String> handleAccessDeniedException(ApiError ex, HttpServletResponse response) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("message",ex.getMessage());
        errorMap.put("status", ex.getStatus().toString());
        response.setStatus(ex.getStatus().value());

        return errorMap;
    }

    @Autowired
    public void setCadastroService(AlunoCadastroService cadastroService) {
        this.cadastroService = cadastroService;
    }

    @Autowired
    public void setConfirmarService(AlunoConfirmarService confirmarService) {
        this.confirmarService = confirmarService;
    }

    @Autowired
    public void setSender(SendConfirmEmail sender) {
        this.sender = sender;
    }

    /*@RequestMapping(value = "/api/aluno", method = RequestMethod.POST)
    // When It's needed to insert alunos
    public Aluno alunoInsert(@RequestBody @Valid Aluno aluno, HttpServletRequest request, BindingResult result) throws ApiError {
        String token = request.getHeader("VerificationToken");
        verificationTokenService.setResult(result);
        VerificationToken tokenFromDB = verificationTokenService.verificar(token);

        aluno.setUsuario(tokenFromDB.getUsuario());
        aluno = alunoDAO.save(aluno);
        verificationTokenService.remover(tokenFromDB);
        return aluno;
    }*/
}
