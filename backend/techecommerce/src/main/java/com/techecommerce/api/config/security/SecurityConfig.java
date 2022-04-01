package com.techecommerce.api.config.security;

import com.techecommerce.api.config.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Resource
    private UserDetailsService userDetailsService;

    @Autowired
    CustomPasswordEncoder passwordEncoder;

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(getUrlFreeAuthentication()).permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(this.jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(this.jwtFilter, JwtAuthenticationFilter.class);
        http.addFilterAfter(this.jwtFilter, JwtAuthenticationFilter.class);
    }

    private String[] getUrlFreeAuthentication() {
        List<String> paths = new ArrayList<>();
        paths.add("/**/v2/api-docs/**");
        paths.add("/configuration/ui");
        paths.add("/v1/api/auth");
        paths.add("/v1/api/login");
        paths.add("/v1/api/categories");
        paths.add("/v1/api/brands");
        paths.add("/v1/api/brands/**");
        paths.add("/v1/api/categories/**");
        paths.add("/v1/api/products/**");
        paths.add("/v1/users");
        paths.add("/configuration/ui");
        paths.add("/**/swagger-resources/**");
        paths.add("/configuration/");
        paths.add("/**/webjars/**");
        paths.add("/api-docs/");
        paths.add("/**/swagger-ui/**");
        paths.add("/**/swagger-ui.html");
        paths.add("/**/matrices");

        return paths.stream().toArray(path -> new String[path]);
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder.getEncoder());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public JwtAuthenticationFilter authenticationTokenFilterBean() {
        return new JwtAuthenticationFilter();
    }
}
