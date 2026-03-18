package com.girlsafety.service;

import com.girlsafety.model.Report;
import com.girlsafety.model.User;
import com.girlsafety.repository.ReportRepository;
import com.girlsafety.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public Report createReport(String email, String description, String location) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Report report = Report.builder()
                .description(description)
                .location(location)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return reportRepository.save(report);
    }

    public List<Report> getUserReports(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return reportRepository.findByUserId(user.getId());
    }
}
