package com.girlsafety.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendSOSMail(String toEmail, String message) {

    SimpleMailMessage mail = new SimpleMailMessage();

    mail.setFrom("bhukyagayathri2005@gmail.com"); // 🔥 ADD THIS LINE
    mail.setTo(toEmail);
    mail.setSubject("🚨 SOS ALERT");
    mail.setText(message);

    mailSender.send(mail);

    System.out.println("Email sent successfully to: " + toEmail);
}
}