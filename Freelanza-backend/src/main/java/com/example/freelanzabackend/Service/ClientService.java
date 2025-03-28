package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.ClientRepository;
import com.example.freelanzabackend.model.Client;
import com.example.freelanzabackend.model.Freelancer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public Client createClient(String email, String name) {
        Client client = new Client();
        client.setEmail(email);
        client.setName(name);
        return clientRepository.save(client);
    }

    public ResponseEntity<Client> getClientByEmail(String email) {
        Optional<Client> clientOptional = clientRepository.findByEmail(email);

        if (clientOptional.isPresent()) {
            return new ResponseEntity<>(clientOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Client> updateClient(Client updatedClient, int clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Client client = clientOptional.get();

        if (updatedClient.getEmail() != null) {
            client.setEmail(updatedClient.getEmail());
        }
        if (updatedClient.getName() != null) {
            client.setName(updatedClient.getName());
        }
        if (updatedClient.getBio() != null) {
            client.setBio(updatedClient.getBio());
        }
        if (updatedClient.getLocation() != null) {
            client.setLocation(updatedClient.getLocation());
        }
        if (updatedClient.getProfessionalTitle() != null) {
            client.setProfessionalTitle(updatedClient.getProfessionalTitle());
        }
        if (updatedClient.getSkills() != null && !updatedClient.getSkills().isEmpty()) {
            client.setSkills(updatedClient.getSkills());
        }

        clientRepository.save(client);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    public ResponseEntity<Client> getClient(int clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isPresent()) {
            return new ResponseEntity<>(clientOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
