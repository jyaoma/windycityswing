package com.windycityswing.windycityswing;

import android.view.LayoutInflater;
import android.view.View;
import android.widget.GridView;
import android.widget.TextView;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.annotation.Config;

import java.text.DateFormatSymbols;
import java.util.Calendar;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.robolectric.shadows.support.v4.SupportFragmentTestUtil.startFragment;

@RunWith(RobolectricTestRunner.class)
@Config(constants = BuildConfig.class)
public class CalendarFragmentTest {

    private CalendarFragment subject;

    @Mock private LayoutInflater mockLayoutInflater;
    @Mock private View mockView;
    @Mock private TextView mockCalendarMonthHeader;
    @Mock private GridView mockCalendar;

    @Before
    public void setUp() {
        initMocks(this);

        subject = new CalendarFragment();
        startFragment(subject);

        when(mockView.findViewById(eq(R.id.calendar_month))).thenReturn(mockCalendarMonthHeader);
        when(mockView.findViewById(eq(R.id.calendar_grid_view))).thenReturn(mockCalendar);
        when(mockLayoutInflater.inflate(anyInt(), any(), anyBoolean())).thenReturn(mockView);
    }

    @Test
    public void onCreateView_setsTheMonthHeaderToTheCurrentMonth() {
        Calendar calendar = Calendar.getInstance();
        int monthInt = calendar.get(Calendar.MONTH);
        DateFormatSymbols dateFormatSymbols = new DateFormatSymbols();
        String monthName = dateFormatSymbols.getMonths()[monthInt];
        int yearInt = calendar.get(Calendar.YEAR);
        String year = Integer.toString(yearInt);
        String expectedCalendarMonth = monthName + " " + year;

        subject.onCreateView(mockLayoutInflater, null, null);

        verify(mockCalendarMonthHeader).setText(eq(expectedCalendarMonth));
    }

    @Test
    public void onCreateView_setsAdapterForGridView() {
        subject.onCreateView(mockLayoutInflater, null, null);

        verify(mockCalendar).setAdapter(any(CalendarAdapter.class));
    }

    @Test
    public void onCreateView_shouldSetEventsForAdapter() {
        subject.onCreateView(mockLayoutInflater, null, null);

        ArgumentCaptor<CalendarAdapter> captor = ArgumentCaptor.forClass(CalendarAdapter.class);
        verify(mockCalendar).setAdapter(captor.capture());
        assertThat(captor).isNotNull();
    }
}