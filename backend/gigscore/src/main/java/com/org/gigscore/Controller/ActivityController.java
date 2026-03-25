package com.org.gigscore.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.gigscore.DTO.ActivityResponse;
import com.org.gigscore.Service.ActivityService;

@RestController
@RequestMapping("/api/activity")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/{userId}")
    public List<ActivityResponse> getRecentActivities(@PathVariable Long userId) {
        return activityService.getLatestActivities(userId);
    }
}
