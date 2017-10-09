package com.dumbdimb.windycityswing.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DanceLocation {
    private String addressName;
    private String addressOne;
    private String addressTwo;
    private String city;
    private String state;
    private String zip;
}
