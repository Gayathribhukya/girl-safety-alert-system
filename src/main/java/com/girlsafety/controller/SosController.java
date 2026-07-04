package com.girlsafety.controller;

import com.girlsafety.dto.SosRequest;
import com.girlsafety.model.SosAlert;
import com.girlsafety.service.SosService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sos")
@RequiredArgsConstructor
public class SosController {

    private final SosService sosService;

   @PostMapping("/send")
public String sendSOS(@RequestBody SosRequest request,
                      Authentication authentication) {

    System.out.println("Authentication = " + authentication);

    if (authentication == null) {
        throw new RuntimeException("Authentication is null");
    }

    String email = authentication.getName();

    return sosService.createSOS(
            email,
            request.getLatitude(),
            request.getLongitude()
    );
}
}