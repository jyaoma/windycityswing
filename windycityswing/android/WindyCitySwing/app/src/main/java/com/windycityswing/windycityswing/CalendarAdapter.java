package com.windycityswing.windycityswing;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.windycityswing.windycityswing.model.CalendarDay;
import com.windycityswing.windycityswing.model.Dance;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

public class CalendarAdapter extends BaseAdapter {

    private List<CalendarDay> calendarDays;

    private final Context context;

    public CalendarAdapter(Context context) {
        this.context = context;
    }

    @Override
    public int getCount() {
        return calendarDays.size();
    }

    @Override
    public Object getItem(int position) {
        return calendarDays.get(position);
    }

    @Override
    public long getItemId(int position) {
        return calendarDays.get(position).getDay();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        CalendarDay calendarDay = (CalendarDay) getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.fragment_calendar_day, null);
        }

        int day = calendarDay.getDay();

        if (day > 0) {
            TextView calendarDayLabel = convertView.findViewById(R.id.calendar_day_label);
            calendarDayLabel.setText(String.valueOf(day));
        }

        return convertView;
    }

    public void setDances(List<Dance> dances) {
        Calendar calendar = new GregorianCalendar();
        int numberOfDaysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, 1);
        int dayOfWeekOfFirstDayOfMonth = calendar.get(Calendar.DAY_OF_WEEK);

        ArrayList<CalendarDay> days = new ArrayList<>(numberOfDaysInMonth);
        for (int i = 1; i < dayOfWeekOfFirstDayOfMonth; i++) {
            days.add(new CalendarDay(-1, null));
        }

        for (int i = 1; i <= numberOfDaysInMonth; i++) {
            days.add(new CalendarDay(i, null));
        }
        for (Dance dance : dances) {
            days.get(dance.getDate().getDay() - 1).addDance(dance);
        }
        this.calendarDays = days;
    }
}
