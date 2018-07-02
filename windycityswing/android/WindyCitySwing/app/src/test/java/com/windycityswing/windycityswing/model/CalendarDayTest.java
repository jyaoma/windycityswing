package com.windycityswing.windycityswing.model;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class CalendarDayTest {
    private CalendarDay calendarDay;

    @Before
    public void setUp() throws Exception {
        calendarDay = new CalendarDay();
    }

    @Test
    public void addDance_whenThereAreNoDances_shouldCreateNewListAndAddDance() throws Exception {
        Dance fizz = new Dance();
        fizz.setTitle("Fizz");
        calendarDay.setDances(new ArrayList<>());

        calendarDay.addDance(fizz);

        assertThat(calendarDay.getDances()).contains(fizz);
    }

    @Test
    public void addDance_whenThereAreDances_shouldAddDance() throws Exception {
        List<Dance> danceList = new ArrayList<>();
        Dance existingDance = new Dance();
        existingDance.setTitle("Java Jive");
        danceList.add(existingDance);
        calendarDay.setDances(danceList);

        Dance fizz = new Dance();
        fizz.setTitle("Fizz");

        calendarDay.addDance(fizz);

        assertThat(calendarDay.getDances()).contains(fizz);
        assertThat(calendarDay.getDances()).contains(existingDance);
    }
}