package com.girlsafety.controller;

import com.girlsafety.dto.LoginRequest;
import com.girlsafety.dto.RegisterRequest;
import com.girlsafety.service.UserService;
import com.girlsafety.service.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;

    private static final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey12345";

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(userService.register(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = userService.login(
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    // ✅ FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");

            if (email == null || email.isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required ❌");
            }

            String token = Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                    .compact();

            String resetLink = "http://localhost:5173/reset-password?token=" + token;

            String message = "Click the link to reset your password:\n" + resetLink;

            emailService.sendSOSMail(email, message);

            return ResponseEntity.ok("Reset link sent 📩");

        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    // ✅ RESET PASSWORD
    @PostMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPassword(
            @PathVariable String token,
            @RequestBody Map<String, String> request
    ) {
        try {
            String newPassword = request.get("password");

            String email = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();

            userService.updatePassword(email, newPassword);

            return ResponseEntity.ok("Password reset successful ✅");

        } catch (Exception e) {
            return ResponseEntity.status(400).body("Invalid or expired token ❌");
        }
    }
}