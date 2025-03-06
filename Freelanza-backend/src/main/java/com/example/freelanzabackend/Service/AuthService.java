package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.UserRepository;
import com.example.freelanzabackend.model.UserCredential;
import com.example.freelanzabackend.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    @Autowired
    private ClientService clientService;
    @Autowired
    private FreelancerService freelancerService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;

    public String generateToken(String username) {
        UserCredential user = userRepository.findByUsername(username).orElseThrow(() ->
                new RuntimeException("User not found"));


        return jwtService.generateToken(username);
    }
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }

    public ResponseEntity<String> updatePassword(UserCredential user) {
        UserCredential existingUser=userRepository.findByUsername(user.getUsername())
                .orElseThrow(()-> new RuntimeException("User not found"));
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(existingUser);
        return new ResponseEntity<>("Password updated successfully", HttpStatus.OK);

    }
    public ResponseEntity<UserCredential> getUserdetails(String token) {
        if (!jwtService.validateToken(token)) {
            return ResponseEntity.status(401).build();
        }
        System.out.println("Fuck You Bro");
        String username = jwtService.extractUsername(token);
        UserCredential user = jwtService.getUserByUsername(username);
        return ResponseEntity.ok(user);


    }

    public String saveOneUser(UserCredential user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        if(user.getUserRole()== UserRole.FREELANCER){
            freelancerService.createFreelancer(user.getUsername());
        }
        else{
            clientService.createClient(user.getUsername());
        }
        return "User Saved Successfully";
    }
}
