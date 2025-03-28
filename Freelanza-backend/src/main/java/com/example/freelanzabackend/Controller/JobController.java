package com.example.freelanzabackend.Controller;

import com.example.freelanzabackend.Service.JobService;
import com.example.freelanzabackend.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;
    @PostMapping("/{clientId}")
    public ResponseEntity<Job> createJob(@RequestBody Job job, @PathVariable int clientId) {
        return jobService.createjob(job,clientId);
    }
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get jobs of a particular client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Job>> getJobsByClient(@PathVariable int clientId) {
        return jobService.getJobsByClient(clientId);
    }
    @GetMapping("/{jobId}")
    public ResponseEntity<Job> getJobById(@PathVariable int jobId) {
        return jobService.getJobById(jobId);
    }
    @GetMapping("active/{clientId}")
    public ResponseEntity<Integer> getCountActiveJobs(@PathVariable int clientId){
        return jobService.getCountActiveJobs(clientId);

    }


}
