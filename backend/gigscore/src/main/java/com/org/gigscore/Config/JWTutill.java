package com.org.gigscore.Config;

import org.springframework.stereotype.Component;
import java.security.Key;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
@Component
public class JWTutill {
    private final long expirationTime=3600000; // 1 hour
    private final Key key= Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new java.util.Date(System.currentTimeMillis()))
                .setExpiration(new java.util.Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    public boolean validateJwtToken(String token){
        try{
            
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();


            return true;
        }
        catch(Exception e){
            return false;
        }
    }
}
