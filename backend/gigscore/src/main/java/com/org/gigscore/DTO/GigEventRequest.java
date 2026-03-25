package com.org.gigscore.DTO;

import lombok.Data;

@Data
public class GigEventRequest {
    private Long userId;
    private String platform;
    private Double amount;
    private Double rating;
}