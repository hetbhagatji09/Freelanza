package com.example.freelanzabackend.Controller;

import com.example.freelanzabackend.Service.ProposalService;
import com.example.freelanzabackend.model.Proposal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/proposals")
@RestController
public class ProposalController {
    @Autowired
    private ProposalService proposalService;

    // Add methods to handle HTTP requests related to proposals
    @PostMapping("/apply/{jobId}/{freelancerId}")
    public ResponseEntity<Proposal> applyProposal(@PathVariable int jobId,
                                  @PathVariable int freelancerId,
                                  @RequestBody Proposal proposal) {
        return proposalService.applyProposal(jobId, freelancerId, proposal);
    }
    @GetMapping("/freelancer/{freelancerId}")
    public List<Proposal> getProposalsByFreelancer(@PathVariable int freelancerId) {
        return proposalService.getProposalsByFreelancer(freelancerId);
    }
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Proposal>> getProposalsByClient(@PathVariable int clientId) {
        return proposalService.getProposalsByClient(clientId);
    }
}
