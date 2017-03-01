package br.com.ifsul.system.api.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import br.com.ifsul.system.api.jwt.extractor.JwtHeaderTokenExtractor;
import br.com.ifsul.system.api.jwt.extractor.TokenExtractor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;


public class TokenAuthenticationService {

    private long EXPIRATIONTIME = 1000 * 60 * 60 * 24 * 10; // 10 days
    private String secret = "ThisIsASecret";
    private String tokenPrefix = "Bearer";
    private String headerString = "Authorization";
    private TokenExtractor tokenExtractor;

    public void addAuthentication(HttpServletResponse response, String username, String role)
    {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("role", "ROLE_"+role);

        String JWT = Jwts.builder()
                    .setSubject(username)
                    .setClaims(claims)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                    .signWith(SignatureAlgorithm.HS512, secret)
                    .compact();
        response.addHeader(headerString, tokenPrefix + " "+ JWT);
        response.addHeader("role", role);
    }

    public Authentication getAuthentication(HttpServletRequest request)
    {
        String token = request.getHeader(headerString);
        tokenExtractor = new JwtHeaderTokenExtractor();
        try {
            token = tokenExtractor.extract(token);
            if(token != null)
            {
                // parse the token.
                String username = Jwts.parser()
                        .setSigningKey(secret)
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject();

                String role = (String) Jwts.parser()
                        .setSigningKey(secret)
                        .parseClaimsJws(token)
                        .getBody()
                        .get("role");

                if(username != null) // we managed to retrieve a user
                {
                    return new AuthenticatedUser(username, role);
                }
            }
        }catch(AuthenticationException e){
            return null;
        }
        return null;
    }
}
