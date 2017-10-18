package com.dumbdimb.windycityswing.domain;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Dance {
	private String title;
	private String className;
	private DanceDate date;
    private DanceTimezone timezone;
    private DanceRecurrence recurrence;
    private String facebookUrl;
    private String organizer;
    private String instructor;
    private DanceScheduleEvent[] schedule;
    private String[] info;
    private String infoUrl;
    private String attendance;
    private DanceMusic music;
    private String floorSize;
    private DanceLocation location;
    private String dressCode;
    private String[] danceStyles;
    private String parking;
    private String price;
    private DanceColorScheme colors;
}
