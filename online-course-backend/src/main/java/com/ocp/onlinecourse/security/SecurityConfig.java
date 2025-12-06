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
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // REQUIRED FOR CORS PREFLIGHT
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // PUBLIC ROOT LEVEL ROUTES
                .requestMatchers("/", "/error", "/favicon.ico").permitAll()

                // PUBLIC HEALTH ENDPOINTS
                .requestMatchers("/actuator/health", "/health").permitAll()

                // PUBLIC AUTH ENDPOINTS
                .requestMatchers("/api/auth/**").permitAll()

                // PUBLIC GET DATA
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()

                // USER ACCESS
                .requestMatchers("/api/enroll/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/checkout/confirm/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()

                // ADMIN ACCESS
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/courses/add").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/admin/delete-course/**").hasAuthority("ROLE_ADMIN")

                // EVERYTHING ELSE IS SECURED
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // FRONTEND DEPLOYED ORIGINS
        config.setAllowedOrigins(Arrays.asList(
                "https://online-course-platform-eosin.vercel.app",
                "https://online-course-platform-mm2u.onrender.com",
                "http://localhost:3000",
                "http://localhost:3001"
        ));

        // HTTP METHODS
        config.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        // HEADERS
        config.setAllowedHeaders(List.of("*"));

        // FOR COOKIES + AUTH HEADERS
        config.setAllowCredentials(true);

        // HEADERS RETURNED TO CLIENT
        config.setExposedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "X-Requested-With",
                "Accept",
                "Origin",
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Methods",
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Credentials"
        ));

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
