package com.example.freelanzabackend.Config;

import com.example.freelanzabackend.Repository.UserRepository;
import com.example.freelanzabackend.model.UserCredential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserCredential> credential=userRepository.findByUsername(username);
        return credential.map(CustomUserDetails::new).orElseThrow(()->new UsernameNotFoundException("User not found"));

    }
}
