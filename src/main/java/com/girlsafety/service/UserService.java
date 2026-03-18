package com.girlsafety.service;

import com.girlsafety.dto.RegisterRequest;
import com.girlsafety.model.User;
import com.girlsafety.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    // ================= REGISTER =================

    public String register(RegisterRequest request) {

    // 🔴 CHECK EMAIL EXISTS
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already registered");
    }

  User user = User.builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role("USER")
        .build();
    userRepository.save(user);

    UserDetails userDetails =
            userDetailsService.loadUserByUsername(user.getEmail());

    return jwtService.generateToken(userDetails);
}
    // ================= LOGIN =================

    public String login(String email, String password) {

    try {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    } catch (Exception e) {
        throw new RuntimeException("Invalid email or password: " + e.getMessage());
    }

    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

    return jwtService.generateToken(userDetails);
}
}