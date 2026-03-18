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

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    SosAlert alert = SosAlert.builder()
            .user(user)
            .latitude(latitude)
            .longitude(longitude)
            .status("SENT")
            .createdAt(LocalDateTime.now())
            .build();

    sosRepository.save(alert);

    // Create Google Maps link
    String mapLink = "https://maps.google.com/?q=" + latitude + "," + longitude;

   String message =
    "🚨 EMERGENCY ALERT 🚨\n\n" +
    "User: " + email + "\n" +
    "Time: " + LocalDateTime.now() + "\n\n" +
    "⚠️ I am in danger. Please help immediately!\n\n" +
    "📍 Live Location:\n" + mapLink + "\n\n" +
    "👉 Click the link to track location.";

    List<EmergencyContact> contacts = contactRepository.findByUser(user);

   for (EmergencyContact contact : contacts) {

    // EMAIL (only if valid)
   if (contact.getEmail() != null && !contact.getEmail().isEmpty()) {
    System.out.println("📧 Sending email to: " + contact.getEmail());
    emailService.sendSOSMail(contact.getEmail(), message); // ✅ FIXED
}

    // SMS (only if valid)
    //String phone = contact.getPhone();

   // if (phone == null || phone.isEmpty()) {
      //  System.out.println("⚠️ Skipping invalid phone");
       // continue;
   // }

    // format fix
   // if (!phone.startsWith("+91")) {
    //    phone = "+91" + phone.replaceFirst("^0+", "");
    //}

    //smsService.sendSMS(phone, message);

    }
    return "SOS Alert Sent Successfully"; // ✅ FIX
}
// GET USER ALERT HISTORY
public List<SosAlert> getUserAlerts(String email) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return sosRepository.findByUser(user);
}
}