package com.girlsafety.repository;

import com.girlsafety.model.EmergencyContact;
import com.girlsafety.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmergencyContactRepository
        extends JpaRepository<EmergencyContact, Long> {

    List<EmergencyContact> findByUser(User user);
}