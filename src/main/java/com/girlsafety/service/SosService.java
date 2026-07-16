package com.girlsafety.service;

import com.girlsafety.model.EmergencyContact;
import com.girlsafety.model.SosAlert;
import com.girlsafety.model.User;
import com.girlsafety.repository.EmergencyContactRepository;
import com.girlsafety.repository.SosRepository;
import com.girlsafety.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SosService {

    private final SosRepository sosRepository;
    private final UserRepository userRepository;
    private final EmergencyContactRepository contactRepository;
    private final EmailService emailService;

    // CREATE SOS ALERT
  public String createSOS(String email, double latitude, double longitude) {

    System.out.println(">>> createSOS() started");

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    System.out.println(">>> User found: " + user.getEmail());

    SosAlert alert = SosAlert.builder()
            .user(user)
            .latitude(latitude)
            .longitude(longitude)
            .status("SENT")
            .createdAt(LocalDateTime.now())
            .build();

    sosRepository.save(alert);

    // Google Maps link
    String mapLink = "https://maps.google.com/?q=" + latitude + "," + longitude;

    // Message
    String message =
            "🚨 EMERGENCY ALERT 🚨\n\n" +
            "User: " + email + "\n" +
            "Time: " + LocalDateTime.now() + "\n\n" +
            "⚠️ I am in danger. Please help immediately!\n\n" +
            "📍 Live Location:\n" + mapLink + "\n\n" +
            "👉 Click the link to track location.";

    List<EmergencyContact> contacts = contactRepository.findByUser(user);

    System.out.println(">>> Number of contacts: " + contacts.size());

    for (EmergencyContact contact : contacts) {

        System.out.println(">>> Contact email: " + contact.getEmail());

        if (contact.getEmail() != null && !contact.getEmail().isEmpty()) {

            System.out.println("📧 Sending email to: " + contact.getEmail());

            emailService.sendSOSMail(contact.getEmail(), message);
        }
    }

    return "SOS Alert Sent Successfully";
}
}