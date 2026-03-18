package com.girlsafety.controller;

import com.girlsafety.model.Report;
import com.girlsafety.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public Report createReport(
            @RequestParam String description,
            @RequestParam String location,
            Authentication authentication
    ) {

        String email = authentication.getName();

        return reportService.createReport(email, description, location);
    }

    @GetMapping
    public List<Report> getMyReports(Authentication authentication) {

        String email = authentication.getName();

        return reportService.getUserReports(email);
    }
}
