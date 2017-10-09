package com.dumbdimb.windycityswing.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DanceScheduleEvent {
    private Integer hour;
    private Integer minute;
    private String event;
}
