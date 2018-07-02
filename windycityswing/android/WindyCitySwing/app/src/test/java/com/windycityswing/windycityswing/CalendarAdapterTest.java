package com.windycityswing.windycityswing;

import android.view.View;
import android.widget.TextView;

import com.windycityswing.windycityswing.model.CalendarDay;
import com.windycityswing.windycityswing.model.Dance;
import com.windycityswing.windycityswing.model.DanceDate;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(RobolectricTestRunner.class)
public class CalendarAdapterTest {
    private CalendarAdapter subject;

    private static ArrayList<Dance> dances;
    private static final Dance fizz = new Dance();

    private static Calendar calendar;
    private static int dayOfWeekOfFirstDayOfMonth;

    @BeforeClass
    public static void beforeAll() {
        calendar = new GregorianCalendar();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        dayOfWeekOfFirstDayOfMonth = calendar.get(Calendar.DAY_OF_WEEK);

        dances = new ArrayList<>();

        fizz.setTitle("Fizz");
        DanceDate danceDate = new DanceDate(2018, 3, 1, Calendar.THURSDAY);
        fizz.setDate(danceDate);
        dances.add(fizz);
    }

    @Before
    public void setUp() {
        subject = new CalendarAdapter(RuntimeEnvironment.application.getApplicationContext());

        subject.setDances(dances);
    }

    @Test
    public void getCount_shouldReturnTheNumberOfCalendarDays() {
        int numberOfDaysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        assertThat(subject.getCount()).isEqualTo(numberOfDaysInMonth);
    }

    @Test
    public void getItem_shouldReturnCalendarDayAtIndex() {
        CalendarDay calendarDay = (CalendarDay) subject.getItem(dayOfWeekOfFirstDayOfMonth - 1);
        assertThat(calendarDay.getDances()).contains(fizz);
    }

    @Test
    public void getItemId_shouldGetDayOfMonth() {
        assertThat(subject.getItemId(dayOfWeekOfFirstDayOfMonth - 1)).isEqualTo(1);
    }

    @Test
    public void getView_shouldGetView() {
        View actualView = subject.getView(dayOfWeekOfFirstDayOfMonth - 1, null, null);
        assertThat(actualView).isNotNull();
    }

    @Test
    public void getView_monthStartsOnTheCorrectDayOfWeek() {
        View actualView = subject.getView(dayOfWeekOfFirstDayOfMonth - 1, null, null);
        assertThat(((TextView)actualView.findViewById(R.id.calendar_day_label)).getText()).isEqualTo("1");
    }

    @Test
    public void getView_whenDayIsNegativeOne_shouldNotShowAnything() {
        View actualView = subject.getView(0, null, null);
        assertThat(((TextView)actualView.findViewById(R.id.calendar_day_label)).getText()).isNullOrEmpty();
    }
}