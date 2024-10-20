package com.techecommerce.main.config.jwt;

import com.techecommerce.main.config.security.CustomUserDetailsService;
import com.techecommerce.main.services.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Resource(name = "customUserDetailsService")
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String username = null;
        String authToken = null;

        // Check for the JWT in the header
        if (header != null && header.startsWith(JwtUtil.JWT_PROVIDER)) {
            authToken = header.substring(JwtUtil.JWT_PROVIDER.length()).trim(); // Remove "Bearer " prefix
            try {
                username = jwtTokenUtil.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                logger.error(JwtUtil.ILLEGAL_ARGUMENT_EXCEPTION, e);
            } catch (ExpiredJwtException e) {
                logger.warn(JwtUtil.JWT_TOKEN_EXPIRED_EXCEPTION, e);
            } catch (SignatureException | MalformedJwtException e) {
                logger.error(JwtUtil.AUTH_FAILED, e);
            } catch (AccessDeniedException e) {
                logger.error(JwtUtil.ACCESS_DENIED, e);
            }
        }

        // If the username is valid and no authentication exists in the security context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = null;
            try {
                userDetails = userDetailsService.loadUserByUsername(username);
            } catch (UsernameNotFoundException e) {
                logger.error("User not found: " + username, e);
            }

            // Validate token and set authentication in the security context
            if (userDetails != null && jwtTokenUtil.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                logger.info("Authenticated user: {} with roles: {}", username,
                        userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.joining(", ")));
            }
        }

            filterChain.doFilter(request, response);
    }
}