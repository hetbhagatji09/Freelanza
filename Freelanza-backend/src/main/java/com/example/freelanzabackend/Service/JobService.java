package com.example.freelanzabackend.Service;

import com.example.freelanzabackend.Repository.ClientRepository;
import com.example.freelanzabackend.Repository.JobRepository;
import com.example.freelanzabackend.model.Client;
import com.example.freelanzabackend.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ClientRepository clientRepository;
    public ResponseEntity<Job> createjob(Job job, int clientId) {
        Optional<Client> clientOptional = clientRepository.findById(clientId);
        if (clientOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Client client = clientOptional.get();
        job.setClient(client);
        job.setBudget((job.getMaxBudget()+job.getMinBudget())/2);
        job.setPostedDate(LocalDate.now());
        Job savedJob = jobRepository.save(job);

        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }
    // Get all jobs
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    // Get jobs of a specific client
    public ResponseEntity<List<Job>> getJobsByClient(int clientId) {
        try{
            Optional<Client> clientOptional = clientRepository.findById(clientId);
            if (clientOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            List<Job> jobs = jobRepository.findByClientClientId(clientId);
            return new ResponseEntity<>(jobs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public ResponseEntity<Job> getJobById(int jobId) {
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        if (jobOptional.isPresent()) {
            return new ResponseEntity<>(jobOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Integer> getCountActiveJobs(int clientId) {
        try{
            Integer count = jobRepository.countActiveJobsByClientId(clientId);
            return new ResponseEntity<>(count, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
