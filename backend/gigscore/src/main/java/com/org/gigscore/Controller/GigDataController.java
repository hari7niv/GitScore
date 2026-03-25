package com.org.gigscore.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.gigscore.DTO.GigEventRequest;
import com.org.gigscore.DTO.UserDashboardResponse;
import com.org.gigscore.Service.GigDataService;
@RestController
@RequestMapping("/api")
public class GigDataController {

        final GigDataService gigDataService;
        public GigDataController(GigDataService gigDataService) {
            this.gigDataService = gigDataService;
        }

    @PostMapping("/gigs")
        public UserDashboardResponse addGig(@RequestBody GigEventRequest request){
            return gigDataService.addGig(request);
    }
}
