package com.ocp.onlinecourse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.UserRepository;

@SpringBootApplication
public class OnlineCourseBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineCourseBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdmin(
            UserRepository userRepository,
            PasswordEncoder encoder,
            @Value("${admin.email}") String adminEmail,
            @Value("${admin.password}") String adminPassword) {

        return args -> {
            // Skip if no admin password provided
            if (adminPassword == null || adminPassword.isEmpty()) {
                System.out.println("⚠️  No admin password set. Skipping admin creation.");
                System.out.println("💡 Set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.");
                return;
            }

            // Create admin if doesn't exist
            if (!userRepository.findByEmail(adminEmail).isPresent()) {
                User admin = new User();
                admin.setName("Administrator");
                admin.setEmail(adminEmail);
                admin.setPassword(encoder.encode(adminPassword));
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println("✅ Admin user created: " + adminEmail);
            } else {
                System.out.println("✅ Admin already exists: " + adminEmail);
            }
        };
    }
}