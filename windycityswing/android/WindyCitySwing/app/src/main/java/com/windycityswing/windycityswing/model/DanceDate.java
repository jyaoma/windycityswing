package com.windycityswing.windycityswing.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DanceDate {
	private Integer year;
	private Integer month;
	private Integer day;
	private Integer weekday;
}