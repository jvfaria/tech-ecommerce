package com.techecommerce.main.config.jwt;

public class JwtUtil {
    public static final String ILLEGAL_ARGUMENT_EXCEPTION = "An error occurred while fetching Username from Token";
    public static final String JWT_TOKEN_EXPIRED_EXCEPTION = "The jwt token has expired";
    public static final String AUTH_FAILED = "Authentication Failed. Username or password not valid !";
    public static final String MALFORMED_JWT = "Malformed JWT Token ! JWT strings must contain exactly 2 period characters";
    public static final String ACCESS_DENIED = "Access denied. Check roles or token.";
    public static final String BEARER_HEADER_NOT_FOUND = "Couldn't find bearer string, header will be ignored";


    public static final int JWT_EXPIRATION_MINUTES = 45*60;
    public static final String JWT_SECRET = "secret";
    public static final String JWT_PROVIDER = "Bearer ";
    public static final String JWT_ROLE_KEY = "role";
}
