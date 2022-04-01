package com.techecommerce.api.config.jwt;

import com.techecommerce.api.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.Resource;
import javax.servlet.FilterChain;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Resource(name = "userService")
    private UserService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
            throws ServletException, IOException, UsernameNotFoundException {
        String header = req.getHeader(HttpHeaders.AUTHORIZATION);
        String username = null;
        String authToken = null;
        if(!Objects.isNull(header) && header.startsWith(JwtUtil.JWT_PROVIDER)) {
            authToken = header.replace(JwtUtil.JWT_PROVIDER, "");
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                logger.error(JwtUtil.ILLEGAL_ARGUMENT_EXCEPTION, e);
            } catch (ExpiredJwtException e) {
                logger.warn(JwtUtil.JWT_TOKEN_EXPIRED_EXCEPTION, e);
            } catch (SignatureException e) {
                logger.error(JwtUtil.AUTH_FAILED, e);
            } catch (MalformedJwtException e) {
                logger.error(JwtUtil.MALFORMED_JWT, e);
            }
        }
//        else {
//            logger.warn(JwtUtil.BEARER_HEADER_NOT_FOUND);
//        }

        if(!Objects.isNull(username) && Objects.isNull(SecurityContextHolder.getContext().getAuthentication())) {
            UserDetails userDetails = null;
            try {
                userDetails = userDetailsService.loadUserByUsername(username);
            } catch (UsernameNotFoundException e) {
                logger.error(e.getMessage());
            }


            if(jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken auth =
                        jwtTokenUtil.getAuthenticationToken(authToken, SecurityContextHolder.getContext().getAuthentication(), userDetails);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

                logger.info("Authenticated user: " + username + ", setting security context...");
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(req, res);
    }
}
