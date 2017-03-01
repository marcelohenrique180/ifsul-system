package br.com.ifsul.system.application.service;

public interface SecurityService {
    String findLoggedInUsername();

    void autologin(String username, String password);
}
