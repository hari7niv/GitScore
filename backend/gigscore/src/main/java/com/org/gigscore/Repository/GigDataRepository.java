package com.org.gigscore.Repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.gigscore.Entity.GigData;
import com.org.gigscore.Entity.User;

public interface GigDataRepository extends JpaRepository<GigData, Long> {

	Optional<GigData> findByUserAndPlatform(User user, String platform);
    List<GigData> findByUser(User user);
}
