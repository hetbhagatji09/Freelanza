package com.example.freelanzabackend.Controller;

import com.example.freelanzabackend.Service.ClientService;
import com.example.freelanzabackend.Service.FreelancerService;
import com.example.freelanzabackend.model.Client;
import com.example.freelanzabackend.model.Freelancer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freelancers")
public class FreelancerController {

    @Autowired
    private FreelancerService freelancerService;

    @GetMapping("/email/{email}")
    public ResponseEntity<Freelancer> getClientByEmail(@PathVariable String email) {
        return freelancerService.getFreelancerByMail(email);
    }
    @PutMapping("/{freelancerId}")
    public ResponseEntity<Freelancer> updateClient(@RequestBody Freelancer freelancer, @PathVariable int freelancerId) {
        return freelancerService.updateFreelancer(freelancer, freelancerId);
    }
    @GetMapping("/{freelancerId}")
    public ResponseEntity<Freelancer> getClient(@PathVariable int freelancerId) {
        return freelancerService.getFreelancer(freelancerId);
    }
}
