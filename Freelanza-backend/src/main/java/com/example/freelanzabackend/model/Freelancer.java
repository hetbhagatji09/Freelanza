package com.example.freelanzabackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Freelancer {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int freelancerId;
    private String name;
    private String email;
    private String Location;
    private float hourlyRate;
    private List<String> skills;
    private String bio;


}
