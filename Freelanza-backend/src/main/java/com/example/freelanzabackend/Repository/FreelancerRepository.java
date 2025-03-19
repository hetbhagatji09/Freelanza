package com.example.freelanzabackend.Repository;

import com.example.freelanzabackend.model.Freelancer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FreelancerRepository extends JpaRepository<Freelancer,Integer> {
    Optional<Freelancer> findByEmail(String email);
}
