package com.girlsafety.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendSOSMail(String toEmail, String message) {

        System.out.println("========== EMAIL START ==========");

        try {

            SimpleMailMessage mail = new SimpleMailMessage();

            mail.setFrom(fromEmail);
            mail.setTo(toEmail);
            mail.setSubject("🚨 SOS ALERT");
            mail.setText(message);

            System.out.println("Sending email to: " + toEmail);

            mailSender.send(mail);

            System.out.println("✅ Email sent successfully!");

        } catch (Exception e) {

            System.out.println("❌ Email failed!");
            e.printStackTrace();

        }

        System.out.println("========== EMAIL END ==========");
    }
}