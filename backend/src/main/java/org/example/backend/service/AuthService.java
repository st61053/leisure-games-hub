package org.example.backend.service;

import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponse;
import org.example.backend.dto.AuthRequest;
import org.example.backend.dto.AuthResponse;
import org.example.backend.dto.RegisterRequest;
import org.example.backend.component.ApiData;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setUsername(request.username());
        user.setFirstname(request.firstName());
        user.setLastname(request.lastName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(role));
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        String jwt = jwtUtil.generateToken(userDetails);
        return new AuthResponse(jwt);
    }

    public ApiResponse<AuthResponse> authenticate(AuthRequest request) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());

        if (!passwordEncoder.matches(request.password(), userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String jwt = jwtUtil.generateToken(userDetails);
        AuthResponse response = new AuthResponse(jwt);

        ApiData<AuthResponse> dataItem = new ApiData<>(UUID.randomUUID().toString(), ApiResourceType.TOKEN.getValue(), response);
        return new ApiResponse<>(List.of(dataItem));
    }
}

