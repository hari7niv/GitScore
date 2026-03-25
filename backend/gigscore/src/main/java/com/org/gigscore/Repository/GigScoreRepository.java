package com.org.gigscore.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.gigscore.Entity.GigScore;
import com.org.gigscore.Entity.User;

public interface  GigScoreRepository extends JpaRepository<GigScore, Long> {
    Optional<GigScore> findByUser(User user);
    
}
