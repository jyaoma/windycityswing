package com.windycityswing.windycityswing.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DanceTimezone {
    private String tzid;
    private String startTimestamp;
    private String endTimestamp;
}
