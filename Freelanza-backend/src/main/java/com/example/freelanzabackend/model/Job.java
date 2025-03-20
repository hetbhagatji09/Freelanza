package com.example.freelanzabackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobId;
    private String category;
    private String jobTitle;

    private LocalDate postedDate;

    private List<String> skills = new ArrayList<>();

    private String description;
    private int minBudget;
    private int maxBudget;
    private Integer budget;
    private String startDate;
    private String deadline;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("jobs")
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;


    @Enumerated(EnumType.STRING)
    private JobStatus status=JobStatus.ACTIVE;
}
