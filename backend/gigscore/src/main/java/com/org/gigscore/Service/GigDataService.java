package com.org.gigscore.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.org.gigscore.DTO.GigEventRequest;
import com.org.gigscore.DTO.GigSummaryResponse;
import com.org.gigscore.DTO.UserDashboardResponse;
import com.org.gigscore.Entity.GigData;
import com.org.gigscore.Entity.User;
import com.org.gigscore.Repository.GigDataRepository;
import com.org.gigscore.Repository.UserRepository;
import com.org.gigscore.Service.UserMetricsService.UserAggregateMetrics;

@Service
public class GigDataService {
    
    final GigDataRepository gigDataRepository;
    final UserRepository userRepository;
    final GigScoreService scoreService;
    final UserMetricsService userMetricsService;
        final ActivityService activityService;

    public GigDataService(
            GigDataRepository gigDataRepository,
            UserRepository userRepository,
            GigScoreService scoreService,
                        UserMetricsService userMetricsService,
                        ActivityService activityService) {
        this.gigDataRepository = gigDataRepository;
        this.userRepository = userRepository;
        this.scoreService = scoreService;
        this.userMetricsService = userMetricsService;
                this.activityService = activityService;
    }

    public UserDashboardResponse addGig(GigEventRequest request){

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<GigData> existingData =
                gigDataRepository.findByUserAndPlatform(user, request.getPlatform());

        GigData data = existingData.orElseGet(() -> {
            GigData g = new GigData();
            g.setUser(user);
            g.setPlatform(request.getPlatform());
            g.setTotalEarnings(0.0);
            g.setJobsCompleted(0);
            g.setAvgRating(0.0);
            g.setActiveDays(0);
            return g;
        });
    
        data.setTotalEarnings(data.getTotalEarnings() + request.getAmount());
        data.setJobsCompleted(data.getJobsCompleted() + 1);
        data.setActiveDays(data.getActiveDays() + 1);

        int oldCount = data.getJobsCompleted() - 1;

        double newAvg = ((data.getAvgRating() * oldCount) + request.getRating())
                / data.getJobsCompleted();

        data.setAvgRating(newAvg);

        gigDataRepository.save(data);
        activityService.recordGigAdded(user, request.getPlatform(), request.getAmount(), request.getRating());

        scoreService.calculateAndPersistScore(user);

        return getUserDashboard(user.getUserId());

    }

    public UserDashboardResponse getUserDashboard(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserAggregateMetrics metrics = userMetricsService.calculateAggregates(user);
        double score = scoreService.getScoreForUser(user).getScore();

        List<GigSummaryResponse> gigSummaries = gigDataRepository.findByUser(user).stream()
                .map(this::toGigSummaryResponse)
                .collect(Collectors.toList());

        return UserDashboardResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .totalEarnings(metrics.totalEarnings())
                .jobsCompleted(metrics.jobsCompleted())
                .avgRating(metrics.avgRating())
                .activeDays(metrics.activeDays())
                .score(score)
                .gigSummaries(gigSummaries)
                .build();
    }

    private GigSummaryResponse toGigSummaryResponse(GigData gigData) {
        return GigSummaryResponse.builder()
                .platform(gigData.getPlatform())
                .totalEarnings(gigData.getTotalEarnings())
                .jobsCompleted(gigData.getJobsCompleted())
                .avgRating(gigData.getAvgRating())
                .activeDays(gigData.getActiveDays())
                .build();
    }
    

}
