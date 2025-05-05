package com.example.restservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { // todo(ew)this needs to be updated once we are in a more usable state; some of this was set up with testing (curl, postman, all local machine) in mind

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for testing; re-enable in production if needed; JWT supposedly not susceptible to CSRF (Cross-Site Request Forgery), unlike traditional session-based auth
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/register", "/auth/login", "/h2-console/**").permitAll() // Allow public access
                .anyRequest().authenticated() // Secure all other endpoints
            )
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build(); // Enable basic auth for testing (not needed for JWT)
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}