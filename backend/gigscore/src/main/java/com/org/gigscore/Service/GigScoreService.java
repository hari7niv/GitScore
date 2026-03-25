package com.org.gigscore.Service;

import org.springframework.stereotype.Service;

import com.org.gigscore.DTO.ScoreResponse;
import com.org.gigscore.Entity.GigScore;
import com.org.gigscore.Entity.User;
import com.org.gigscore.Repository.GigScoreRepository;
import com.org.gigscore.Service.UserMetricsService.UserAggregateMetrics;

@Service
public class GigScoreService {
    final GigScoreRepository gigScoreRepository;
    final UserMetricsService userMetricsService;

    public GigScoreService(GigScoreRepository gigScoreRepository, UserMetricsService userMetricsService) {
        this.gigScoreRepository = gigScoreRepository;
        this.userMetricsService = userMetricsService;
    }

    public ScoreResponse calculateAndPersistScore(User user) {
        UserAggregateMetrics metrics = userMetricsService.calculateAggregates(user);
        double score = calculateScoreValue(metrics);

        GigScore gigScore = gigScoreRepository.findByUser(user).orElse(new GigScore());
        gigScore.setUser(user);
        gigScore.setScore(score);
        gigScoreRepository.save(gigScore);

        return ScoreResponse.builder()
                .userId(user.getUserId())
                .score(score)
                .build();
    }

    public double calculateScoreValue(UserAggregateMetrics metrics) {
        double score = 0;
        score += (metrics.totalEarnings() / 1000) * 0.3;
        score += metrics.jobsCompleted() * 0.2;
        score += metrics.avgRating() * 20;
        score += metrics.activeDays() * 0.1;
        return score;
    }

    public ScoreResponse getScoreForUser(User user) {
        return calculateAndPersistScore(user);

    }

}
