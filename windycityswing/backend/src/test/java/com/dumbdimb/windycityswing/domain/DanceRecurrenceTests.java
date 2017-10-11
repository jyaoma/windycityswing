package com.dumbdimb.windycityswing.domain;

import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class DanceRecurrenceTests {

    @Test
    public void doesOccurInThisMonth_everythingNull_returnsTrue() {
        DanceRecurrence recurrence = new DanceRecurrence();
        assertTrue(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_endNull_returnsTrue() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartMonth(1);
        recurrence.setStartYear(2016);
        assertTrue(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_endNull_returnsFalse() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartMonth(1);
        recurrence.setStartYear(2018);
        assertFalse(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_startNull_returnsTrue() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setEndMonth(12);
        recurrence.setEndYear(2018);
        assertTrue(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_startNull_returnsFalse() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setEndMonth(12);
        recurrence.setEndYear(2016);
        assertFalse(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_upcoming_returnsFalse() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartYear(2018);
        recurrence.setStartMonth(1);
        recurrence.setEndMonth(12);
        recurrence.setEndYear(2018);
        assertFalse(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_past_returnsFalse() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartYear(2016);
        recurrence.setStartMonth(1);
        recurrence.setEndMonth(12);
        recurrence.setEndYear(2016);
        assertFalse(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_current_returnsTrue() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartYear(2016);
        recurrence.setStartMonth(1);
        recurrence.setEndMonth(12);
        recurrence.setEndYear(2018);
        assertTrue(recurrence.doesOccurInThisMonth(2017, 10));
    }

    @Test
    public void doesOccurInThisMonth_sameMonthAndYear_returnsTrue() {
        DanceRecurrence recurrence = new DanceRecurrence();
        recurrence.setStartYear(2017);
        recurrence.setStartMonth(10);
        recurrence.setEndMonth(10);
        recurrence.setEndYear(2017);
        assertTrue(recurrence.doesOccurInThisMonth(2017, 10));
    }
}
