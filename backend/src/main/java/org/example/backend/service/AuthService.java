package org.example.backend.service;

import lombok.AllArgsConstructor;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.*;
import org.example.backend.component.ApiData;
import org.example.backend.entity.GameCollection;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;


@AllArgsConstructor

@Service
public class AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtUtil;
    private GameCollectionService gameCollectionService;
    private CustomUserDetailsService userDetailsService;

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

        ActionResultDto result = new ActionResultDto(
                user.getId(),
                "success",
                "USER_CREATED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ApiResponseDto<AuthResponseDto> authenticate(AuthRequestDto request) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());

        if (!passwordEncoder.matches(request.password(), userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        String jwt = jwtUtil.generateToken(userDetails);
        AuthResponseDto response = new AuthResponseDto(jwt);

        ApiData<AuthResponseDto> dataItem = new ApiData<>(UUID.randomUUID().toString(), ApiResourceType.TOKEN.getValue(), response);
        return new ApiResponseDto<>(List.of(dataItem));

    }
}

