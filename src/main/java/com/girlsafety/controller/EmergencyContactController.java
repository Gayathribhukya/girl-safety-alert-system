package com.girlsafety.controller;

import com.girlsafety.model.EmergencyContact;
import com.girlsafety.model.User;
import com.girlsafety.repository.EmergencyContactRepository;
import com.girlsafety.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import com.girlsafety.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class EmergencyContactController {

    private final EmergencyContactRepository contactRepository;
    private final UserRepository userRepository;
    private final ContactService contactService;

    // ✅ ADD CONTACT
    @PostMapping
    public String addContact(@RequestBody EmergencyContact contact,
                             Authentication authentication) {

        // 🔥 Validate input
        if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        // 🔥 Get logged-in user
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 Link contact to user
        contact.setUser(user);

        // Optional: Debug log
        System.out.println("Saving contact for user: " + email);
        System.out.println("Contact email: " + contact.getEmail());

        contactRepository.save(contact);

        return "✅ Contact saved successfully";
    }

    // ✅ GET MY CONTACTS
    @GetMapping("/my")
    public List<EmergencyContact> myContacts(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return contactRepository.findByUser(user);
    }
  @DeleteMapping("/{id}")
public ResponseEntity<?> deleteContact(@PathVariable Long id,
                                       Authentication authentication) {

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    EmergencyContact contact = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contact not found"));

    if (!contact.getUser().getId().equals(user.getId())) {
        return ResponseEntity.status(403).body("Unauthorized ❌");
    }

    contactRepository.delete(contact);

    return ResponseEntity.ok("Deleted successfully ✅");
}
}