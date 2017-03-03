package br.com.ifsul.system.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {
    @GetMapping({"/", "/cadastro/aluno/**", "/menu/**"})
    public String greeting(Model model) {
        return "index";
    }
}
