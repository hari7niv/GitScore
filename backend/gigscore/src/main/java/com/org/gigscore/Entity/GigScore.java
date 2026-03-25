package com.org.gigscore.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
@Entity
@Data
public class GigScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gigScoreId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    private Double score;
}
