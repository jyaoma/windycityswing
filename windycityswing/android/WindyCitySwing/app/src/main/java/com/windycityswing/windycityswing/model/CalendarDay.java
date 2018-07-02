package com.windycityswing.windycityswing.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarDay {
    private int day;
    private List<Dance> dances;

    public void addDance(Dance dance) {
        if (dances == null) {
            dances = new ArrayList<>();
        }
        dances.add(dance);
    }
}