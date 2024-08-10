package com.akshay.localecommerce.security;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

/**
 * Component to manage JWT operations
 */
@Component
public class JWTUtils {

    private SecretKey key;
    private static final long EXPIRATION_TIME = 86400000; // 24 HOURS

    /**
     * Constructs a JWTUtils clas with a secret key
     */
    private JWTUtils() {
        String secreteString = "gSHTOlRm0VL8jJjZiXs9QLn1dPvgG4Wd3zHJ2WklzA3fKrFywULiP0Jc3j6sxH8wPfyvnG8r/8pIa9yI+mC5Mg==";
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    /**
     * Generates a JWT token for the given users details
     * 
     * @param userDetails The details of the user to added to the token
     * @return The token
     */
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    /**
     * Generate a refresh token
     * 
     * @param claims      The claims that is to be added to the token
     * @param userDetails The details of the user to be added to the token
     * @return The refresh token
     */
    public String generateRefreshToken(HashMap<String, Object> claims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    /**
     * Extracts the user name from the token
     * 
     * @param token The token from which to extract the user name
     * @return The username that was extracted from the token
     */
    public String extractionUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    /**
     * Extracts the claims from the token
     * 
     * @param <T>             Type of the claim
     * @param token           the JWT token
     * @param claimsTFunction The function to extract claims
     * @return The extracted claims
     */
    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
    }

    /**
     * Checks if the token is valid or not
     * 
     * @param token       The token to check for validation
     * @param userDetails The user details to compare with the token
     * @return {@code true} if the token is valid, {@code false} otherwise
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractionUsername((token));
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Chekcs if the token is expired or not
     * 
     * @param token The token to check for expiration
     * @return {@code true} if the token is expired, {@code false}
     */
    public boolean isTokenExpired(String token) {

        return extractClaims(token, Claims::getExpiration).before(new Date());

    }

}
