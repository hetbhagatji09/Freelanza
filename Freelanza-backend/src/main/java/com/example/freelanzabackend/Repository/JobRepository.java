package com.example.freelanzabackend.Repository;

import com.example.freelanzabackend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Integer> {

    List<Job> findByClientClientId(int clientId);
    @Query("SELECT COUNT(j) FROM Job j WHERE j.client.clientId = :clientId AND j.status = 'ACTIVE'")
    Integer countActiveJobsByClientId(@Param("clientId") int clientId);
}
