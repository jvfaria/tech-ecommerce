package com.techecommerce.main.config.security;

import com.techecommerce.main.config.jwt.JwtAuthenticationFilter;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Resource
    private CustomPasswordEncoder passwordEncoder;

    @Resource
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(getUrlFreeAuthentication()).permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
                        }))
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    private String[] getUrlFreeAuthentication() {
        List<String> paths = new ArrayList<>();
        paths.add("/**/v2/api-docs/**");
        paths.add("/configuration/ui");
        paths.add("/v1/auth");
        paths.add("/v1/login");
        paths.add("/v1/categories");
        paths.add("/v1/brands");
        paths.add("/v1/brands/**");
        paths.add("/v1/categories/**");
        paths.add("/v1/products/**");
        paths.add("/v1/stock/**");
        paths.add("/v1/user-info/**");
        paths.add("/v1/users");
        paths.add("/v1/user-info/**");
        paths.add("/v1/downloadFile/**");
        paths.add("/downloadFile/**");
        paths.add("/v1/downloadFile");
        paths.add("/v1/images/**");
        paths.add("/v1/images");
        paths.add("/configuration/ui");
        paths.add("/**/swagger-resources/**");
        paths.add("/configuration/");
        paths.add("/**/webjars/**");
        paths.add("/api-docs/");
        paths.add("/**/swagger-ui/**");
        paths.add("/**/swagger-ui.html");
        paths.add("/**/matrices");
        paths.add("/v1/messages/send-order");
        paths.add("/v1/admin/**");

        return paths.toArray(String[]::new);
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder.getEncoder());
        return authenticationManagerBuilder.build();
    }

    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://your-allowed-origin.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}