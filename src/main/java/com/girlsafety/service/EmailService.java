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

    try {

        System.out.println("========== EMAIL DEBUG ==========");
        System.out.println("STEP 1: Creating mail");

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom("girlsafetyalertsystem@gmail.com");
        mail.setTo(toEmail);
        mail.setSubject("🚨 SOS ALERT");
        mail.setText(message);

        System.out.println("STEP 2: Calling mailSender.send()");

        mailSender.send(mail);

        System.out.println("STEP 3: Email sent successfully!");

    } catch (Exception e) {

        System.out.println("STEP 4: Email failed!");
        e.printStackTrace();

    }

    System.out.println("========== END EMAIL DEBUG ==========");
}

}