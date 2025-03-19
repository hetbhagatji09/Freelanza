package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.FreelancerRepository;
import com.example.freelanzabackend.model.Client;
import com.example.freelanzabackend.model.Freelancer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FreelancerService {
    @Autowired
    private FreelancerRepository freelancerRepository;

    public Freelancer createFreelancer(String email,String name) {
        Freelancer freelancer = new Freelancer();
        freelancer.setEmail(email);
        freelancer.setName(name);
        freelancerRepository.save(freelancer);
        return freelancer;

    }
    public ResponseEntity<Freelancer> getFreelancerByMail(String email) {
        Optional<Freelancer> freelancerOptional = freelancerRepository.findByEmail(email);

        if (freelancerOptional.isPresent()) {
            return new ResponseEntity<>(freelancerOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
