package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.*;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final GameCollectionService gameCollectionService;
    private final CustomUserDetailsService userDetailsService;

    public ResponseEntity<ActionResponseDto> register(RegisterRequestDto request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        Role role = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setUsername(request.username());
        user.setFirstname(request.firstname());
        user.setLastname(request.lastname());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(role));

        userRepository.save(user);
        gameCollectionService.createDefaultFavoriteCollection(user);
        log.info("User {} registered successfully with ID {}", request.username(), user.getId());

        return buildActionResponse(user.getId(), "USER_CREATED");
    }

    public ApiResponseDto<AuthResponseDto> authenticate(AuthRequestDto request) {
        UserDetails userDetails = userDetailsService.loadUserByEmail(request.email());
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(userDetails);
        AuthResponseDto response = new AuthResponseDto(token, user.getId());

        ApiData<AuthResponseDto> data = new ApiData<>(
                UUID.randomUUID().toString(),
                ApiResourceType.TOKEN.getValue(),
                response
        );
        log.info("Authentication successful for user: {}", user.getUsername());

        return new ApiResponseDto<>(List.of(data));
    }

    private ResponseEntity<ActionResponseDto> buildActionResponse(String id, String message) {
        ActionResultDto result = new ActionResultDto(id, "success", message);
        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }
}
