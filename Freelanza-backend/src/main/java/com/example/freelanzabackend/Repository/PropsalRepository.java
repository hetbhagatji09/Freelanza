package com.example.freelanzabackend.Repository;

import com.example.freelanzabackend.model.Proposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PropsalRepository extends JpaRepository<Proposal,Integer> {

    List<Proposal> findByFreelancer_FreelancerId(int freelancerId);

    List<Proposal>findByJob_Client_ClientId(int clientId);
}
