package com.ocp.onlinecourse;

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
	public CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder encoder) {
	    return args -> {
	        if (!userRepository.findByEmail("aniket1@gmail.com").isPresent()) {
	            User admin = new User();
	            admin.setName("Aniket");
	            admin.setEmail("aniket1@gmail.com");
	            admin.setPassword(encoder.encode("aniket111"));
	            admin.setRole("ADMIN");
	            userRepository.save(admin);
	            System.out.println("🔥 Admin user created: aniket@gmail.com / aniket111");
	        } else {
	            System.out.println("✔ Admin already exists!");
	        }
	    };
	}
}
