package com.dumbdimb.windycityswing.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DanceRecurrence {
    private String rule;
    private Integer dayOfWeek;
    private Integer weekOfMonth;
    private String[] exceptions;
}
