package br.com.ifsul.system.infrastructure.errorhandling;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler({ ApiError.class })
    public Map<String, String> handleException(ApiError ex, HttpServletResponse response) {

        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("status", ex.getStatus().toString());
        errorMap.put("message",ex.getMessage());
        response.setStatus(ex.getStatus().value());

        return errorMap;
    }
}
