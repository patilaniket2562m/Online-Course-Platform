package com.ocp.onlinecourse.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ocp.onlinecourse.model.User;
import com.ocp.onlinecourse.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Only allow USER or ADMIN as valid roles
        if (user.getRole() == null ||
                !(user.getRole().equalsIgnoreCase("USER") ||
                  user.getRole().equalsIgnoreCase("ADMIN"))) {

            user.setRole("USER"); // Default safe role
        }

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
