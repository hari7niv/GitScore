package com.org.gigscore.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.gigscore.Entity.Activity;
import com.org.gigscore.Entity.User;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findTop5ByUserOrderByTimestampDesc(User user);
}
