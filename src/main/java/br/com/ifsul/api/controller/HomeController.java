package br.com.ifsul.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
    @GetMapping({"/", "/cadastro/aluno/**", "/menu/**", "/login"})
    public String greeting() {
        return "index";
    }
}
