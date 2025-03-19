package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.ClientRepository;
import com.example.freelanzabackend.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;
    public Client createClient(String email,String name) {
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
}
