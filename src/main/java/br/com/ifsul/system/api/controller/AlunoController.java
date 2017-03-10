package br.com.ifsul.system.api.controller;

import br.com.ifsul.system.application.service.AlunoCadastroService;
import br.com.ifsul.system.application.service.AlunoConfirmarService;
import br.com.ifsul.system.application.service.SendConfirmEmail;
import br.com.ifsul.system.application.service.VerificationTokenService;
import br.com.ifsul.system.infrastructure.database.dao.AlunoDAO;
import br.com.ifsul.system.infrastructure.errorhandling.ApiError;
import br.com.ifsul.system.pojo.Aluno;
import br.com.ifsul.system.pojo.Usuario;
import br.com.ifsul.system.pojo.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AlunoController {

    private AlunoCadastroService cadastroService;
    private VerificationTokenService verificationTokenService;
    private AlunoConfirmarService confirmarService;

    @Autowired
    private RepositoryEntityLinks entityLinks;

    @Value("${spring.local.host}")
    private String url;
    private SendConfirmEmail sender;

    private AlunoDAO alunoDAO;


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

    //@RequestMapping(value = "/api/aluno", method = RequestMethod.POST)
    // When It's needed to insert alunos
    public Aluno alunoInsert(@RequestBody @Valid Aluno aluno, HttpServletRequest request, BindingResult result) throws ApiError {
        String token = request.getHeader("VerificationToken");
        verificationTokenService.setResult(result);
        VerificationToken tokenFromDB = verificationTokenService.verificar(token);

        aluno.setUsuario(tokenFromDB.getUsuario());
        aluno = alunoDAO.save(aluno);
        verificationTokenService.remover(tokenFromDB);
        return aluno;
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
    public void setVerificationTokenService(VerificationTokenService verificationTokenService) {
        this.verificationTokenService = verificationTokenService;
    }

    @Autowired
    public void setAlunoDAO(AlunoDAO alunoDAO) {
        this.alunoDAO = alunoDAO;
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
}
