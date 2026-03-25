package com.org.gigscore.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.gigscore.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    java.util.Optional<User> findByEmail(String email);
    
}
