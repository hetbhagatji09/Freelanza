package com.example.freelanzabackend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // Ignore Lazy Initialization Issues
public class Proposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int proposalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "proposals"})
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "proposals"})
    @JoinColumn(name = "freelancer_id", nullable = false)
    private Freelancer freelancer;

    private String coverLetter;
    private int bidAmount;
    private LocalDate applicationDate;
    private int deliveryDays;

    @Enumerated(EnumType.STRING)
    private ProposalStatus status = ProposalStatus.PENDING;
}
