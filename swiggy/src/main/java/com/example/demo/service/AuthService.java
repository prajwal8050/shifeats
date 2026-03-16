package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    public String login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            String token = UUID.randomUUID().toString();
            user.setSessionToken(token);
            userRepository.save(user);
            return token;
        }
        throw new RuntimeException("Invalid credentials");
    }

    public User getUserByToken(String token) {
        return userRepository.findBySessionToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
    }

    public void logout(String token) {
        Optional<User> userOpt = userRepository.findBySessionToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setSessionToken(null);
            userRepository.save(user);
        }
    }
}
