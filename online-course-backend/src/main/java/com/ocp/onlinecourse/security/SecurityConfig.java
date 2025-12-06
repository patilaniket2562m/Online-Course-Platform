package com.ocp.onlinecourse.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(org.springframework.security.config.annotation.web.builders.HttpSecurity http) throws Exception {

        http
            // ⭐ Required to let requests AFTER our cors filter
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // ⭐ Must allow OPTIONS always
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ⭐ Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/**").permitAll()
                .requestMatchers("/", "/health", "/actuator/health").permitAll()

                // ⭐ User endpoints
                .requestMatchers("/api/enroll/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/checkout/confirm/**").hasAuthority("ROLE_USER")
                .requestMatchers(HttpMethod.POST, "/api/reviews/**").authenticated()

                // ⭐ Admin endpoints
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/courses/add").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/admin/delete-course/**").hasAuthority("ROLE_ADMIN")

                // ⭐ Other requests require auth
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        // ⭐ JWT filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * ⭐⭐ CRITICAL FIX ⭐⭐
     * THIS FILTER RUNS BEFORE SPRING SECURITY (order=0)
     * AND HANDLES ALL CORS REQUESTS INCLUDING OPTIONS.
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {

        CorsConfiguration config = new CorsConfiguration();

        // ⭐ Allowed origins (patterns allow wildcards)
        config.setAllowedOriginPatterns(List.of(
                "https://online-course-platform-eosin.vercel.app",
                "http://localhost:*",
                "https://*.railway.app",
                "https://devoted-heart-production.up.railway.app"
        ));

        // ⭐ Allowed HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // ⭐ Allowed headers
        config.setAllowedHeaders(List.of("*"));

        // ⭐ Allow client to read ALL headers
        config.setExposedHeaders(List.of("*"));

        // ⭐ Required if using cookies/JWT in Authorization header
        config.setAllowCredentials(true);

        // ⭐ Cache preflight for 1 hour
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // ⭐⭐ This is the magic ⭐⭐
        FilterRegistrationBean<CorsFilter> bean =
                new FilterRegistrationBean<>(new CorsFilter(source));

        // ⭐⭐ Runs BEFORE Spring Security ⭐⭐
        bean.setOrder(0);

        return bean;
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
