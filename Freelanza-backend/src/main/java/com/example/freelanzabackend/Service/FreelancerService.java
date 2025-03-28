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

    public ResponseEntity<Freelancer> updateFreelancer(Freelancer updatedFreelancer, int freelancerId) {
        try {
            Optional<Freelancer> freelancerOptional = freelancerRepository.findById(freelancerId);
            if (freelancerOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Freelancer freelancer = freelancerOptional.get();

            if (updatedFreelancer.getEmail() != null) {
                freelancer.setEmail(updatedFreelancer.getEmail());
            }
            if (updatedFreelancer.getName() != null) {
                freelancer.setName(updatedFreelancer.getName());
            }
            if (updatedFreelancer.getBio() != null) {
                freelancer.setBio(updatedFreelancer.getBio());
            }
            if (updatedFreelancer.getLocation() != null) {
                freelancer.setLocation(updatedFreelancer.getLocation());
            }
            if (updatedFreelancer.getHourlyRate() > 0) { // Ensure valid hourly rate
                freelancer.setHourlyRate(updatedFreelancer.getHourlyRate());
            }
            if (updatedFreelancer.getSkills() != null && !updatedFreelancer.getSkills().isEmpty()) {
                freelancer.setSkills(updatedFreelancer.getSkills());
            }

            freelancerRepository.save(freelancer);
            return new ResponseEntity<>(freelancer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Freelancer> getFreelancer(int freelancerId) {
        Optional<Freelancer> freelancerOptional = freelancerRepository.findById(freelancerId);
        if (freelancerOptional.isPresent()) {
            return new ResponseEntity<>(freelancerOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
