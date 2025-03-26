package org.example.backend.component;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@Slf4j // logger
@AllArgsConstructor // lombok
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // 1. Zajistit role v databázi
        Role userRole = roleRepository.findByName("ROLE_USER").orElse(null);
        if (userRole == null) {
            userRole = roleRepository.save(new Role(null, "ROLE_USER"));
        }

        Role adminRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);
        if (adminRole == null) {
            adminRole = roleRepository.save(new Role(null, "ROLE_ADMIN"));
        }

        // 2. Vytvoření admina, pokud neexistuje
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setFirstname("Admin");
            admin.setLastname("User");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("Admin123"));
            admin.setRoles(Set.of(adminRole));
            userRepository.save(admin);

            log.info("Created admin user with username 'admin' and password 'Admin123'");
        }
    }
}

