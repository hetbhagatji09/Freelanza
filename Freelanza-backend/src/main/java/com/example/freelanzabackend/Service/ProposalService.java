package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.FreelancerRepository;
import com.example.freelanzabackend.Repository.JobRepository;
import com.example.freelanzabackend.Repository.PropsalRepository;
import com.example.freelanzabackend.model.Freelancer;
import com.example.freelanzabackend.model.Job;
import com.example.freelanzabackend.model.Proposal;
import com.example.freelanzabackend.model.ProposalStatus;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {
    @Autowired
    private PropsalRepository propsalRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private PropsalRepository proposalRepository;
    @Autowired
    private FreelancerRepository freelancerRepository;

    public ResponseEntity<Proposal> applyProposal(int jobId, int freelancerId, Proposal proposal) {
        try{
            Optional<Job> jobOptional = jobRepository.findById(jobId);
            Optional<Freelancer> freelancerOptional = freelancerRepository.findById(freelancerId);

            if (jobOptional.isPresent() && freelancerOptional.isPresent()) {
                Job job = jobOptional.get();
                Freelancer freelancer = freelancerOptional.get();

                proposal.setJob(job);
                proposal.setFreelancer(freelancer);
                proposal.setApplicationDate(LocalDate.now());
                proposal.setStatus(ProposalStatus.PENDING);
                proposalRepository.save(proposal);
                return new ResponseEntity<>(proposal, HttpStatus.OK);

            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public List<Proposal> getProposalsByFreelancer(int freelancerId) {
            return proposalRepository.findByFreelancer_FreelancerId(freelancerId);
    }
    public ResponseEntity<List<Proposal>> getProposalsByClient(int clientId) {
        try{
            List<Proposal> proposals =proposalRepository.findByJob_Client_ClientId(clientId);
            if (proposals.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(proposals, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
