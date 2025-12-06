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

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // ⭐ Allow CORS before security rules
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // ⭐⭐ REQUIRED for CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public endpoints
                .requestMatchers("/", "/error", "/favicon.ico").permitAll()
                .requestMatchers("/actuator/health", "/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // Public GET endpoints
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()

                // User endpoints
                .requestMatchers("/api/enroll/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/checkout/confirm/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()

                // Admin endpoints
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/courses/add").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/admin/delete-course/**").hasAuthority("ROLE_ADMIN")

                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        // ⭐ Add JWT before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        // ⭐ Prevent frame CORS failures
        http.headers().frameOptions().disable();

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ⭐ REQUIRED FOR ALL CLOUD DEPLOYS
        config.setAllowedOriginPatterns(Arrays.asList("*"));

        config.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        config.setAllowedHeaders(Arrays.asList("*"));
        config.setExposedHeaders(Arrays.asList(
                "Authorization", "Content-Type",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Methods",
                "Access-Control-Allow-Credentials"
        ));

        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
