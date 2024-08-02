package com.example.AI_Diary;

import com.example.AI_Diary.model.User;
import com.example.AI_Diary.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class AiDiaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiDiaryApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("testuser@example.com").isEmpty()) {
                User user = new User();
                user.setUserId("testuser");
                user.setName("username");
                user.setPassword(passwordEncoder.encode("password"));
                user.setEmail("testuser@example.com");
                userRepository.save(user);
            }
        };
    }
}
