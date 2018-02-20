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
    private Integer startYear;
    private Integer startMonth;
    private Integer endYear;
    private Integer endMonth;

    public boolean doesOccurInThisMonth (Integer year, Integer month) {
        Integer nonNullStartYear = startYear;
        if (startYear == null) {
            nonNullStartYear = 0;
        }
        Integer nonNullStartMonth = startMonth;
        if (startMonth == null) {
            nonNullStartMonth = 0;
        }
        Integer nonNullEndYear = endYear;
        if (endYear == null) {
            nonNullEndYear = Integer.MAX_VALUE;
        }
        Integer nonNullEndMonth = endMonth;
        if (endMonth == null) {
            nonNullEndMonth = 13;
        }

        return (year > nonNullStartYear || (year.equals(nonNullStartYear) && month >= nonNullStartMonth)) && (year < nonNullEndYear || (year.equals(nonNullEndYear) && month <= nonNullEndMonth));
    }
}
