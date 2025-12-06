package com.ocp.onlinecourse.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable());

        http.authorizeHttpRequests(auth -> auth

                // Allow CORS Preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public (No Login Required)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()

                // User (Must be logged in)
                .requestMatchers("/api/enroll/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/checkout/confirm/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()

                // Admin (Must be admin)
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/admin/delete-course/**").hasAuthority("ROLE_ADMIN")

                // Everything else requires login
                .anyRequest().authenticated()
        );

        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ FIXED: Allow your exact Vercel frontend URL
        config.setAllowedOrigins(List.of(
            "https://online-course-platform-eosin.vercel.app",
            "http://localhost:3000"  // for local development
        ));

        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        config.setAllowedHeaders(List.of(
            "Authorization", 
            "Content-Type", 
            "Accept",
            "Origin",
            "X-Requested-With"
        ));

        config.setExposedHeaders(List.of(
            "Authorization",
            "Content-Type"
        ));

        // ✅ CRITICAL: Allow credentials (for cookies/auth headers)
        config.setAllowCredentials(true);

        // ✅ Cache preflight requests for 1 hour
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
