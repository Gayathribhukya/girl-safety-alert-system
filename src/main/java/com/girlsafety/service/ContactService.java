package com.girlsafety.service;

import com.girlsafety.repository.EmergencyContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final EmergencyContactRepository contactRepository;

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}