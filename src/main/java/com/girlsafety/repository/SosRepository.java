package com.girlsafety.repository;

import com.girlsafety.model.SosAlert;
import com.girlsafety.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SosRepository extends JpaRepository<SosAlert, Long> {

    List<SosAlert> findByUser(User user);

}