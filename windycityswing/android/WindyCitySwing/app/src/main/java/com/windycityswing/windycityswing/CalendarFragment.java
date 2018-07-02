package com.windycityswing.windycityswing;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridView;
import android.widget.TextView;

import com.windycityswing.windycityswing.model.Dance;

import java.text.DateFormatSymbols;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class CalendarFragment extends Fragment {

    List<Dance> dances;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View inflatedView = inflater.inflate(R.layout.fragment_calendar, container, true);

        Calendar calendar = Calendar.getInstance();
        String month = new DateFormatSymbols().getMonths()[calendar.get(Calendar.MONTH)];
        String year = Integer.toString(calendar.get(Calendar.YEAR));
        TextView calendarMonth = inflatedView.findViewById(R.id.calendar_month);
        calendarMonth.setText(String.format("%s %s", month, year));

        CalendarAdapter calendarAdapter = new CalendarAdapter(getContext());
        dances = new ArrayList<>();
        calendarAdapter.setDances(dances);

        GridView calendarGridView = inflatedView.findViewById(R.id.calendar_grid_view);
        calendarGridView.setAdapter(calendarAdapter);

        return inflatedView;
    }
}
