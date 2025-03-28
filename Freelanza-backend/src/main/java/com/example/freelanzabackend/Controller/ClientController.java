package com.example.freelanzabackend.Controller;

import com.example.freelanzabackend.Service.ClientService;
import com.example.freelanzabackend.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/email/{email}")
    public ResponseEntity<Client> getClientByEmail(@PathVariable String email) {
        return clientService.getClientByEmail(email);
    }
    @PutMapping("/{clientId}")
    public ResponseEntity<Client> updateClient(@RequestBody Client client, @PathVariable int clientId) {
        return clientService.updateClient(client, clientId);
    }
    @GetMapping("/{clientId}")
    public ResponseEntity<Client> getClient(@PathVariable int clientId) {
        return clientService.getClient(clientId);
    }
}
