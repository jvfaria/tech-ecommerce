package com.techecommerce.main.config.security;

import com.techecommerce.main.config.jwt.JwtAuthenticationFilter;
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
        paths.add("/v1/downloadFile");
        paths.add("/v1/downloadFile/**");
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
