package com.example.freelanzabackend.Repository;

import com.example.freelanzabackend.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserCredential,Integer> {
    Optional<UserCredential> findByUsername(String username);
}
