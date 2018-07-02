package com.windycityswing.windycityswing;

import android.widget.TextView;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;

import static junit.framework.Assert.assertNotNull;

@RunWith(RobolectricTestRunner.class)
public class CalendarActivityTest {

    private CalendarActivity subject;

    @Before
    public void setUp() {
        subject = Robolectric.setupActivity(CalendarActivity.class);
    }

    @Test
    public void onCreate_setsTitleFont() {
        TextView title = subject.findViewById(R.id.title);
        assertNotNull(title.getTypeface());
    }

    @Test
    public void onCreate_setsSubtitleFont() {
        TextView subtitle = subject.findViewById(R.id.subtitle);
        assertNotNull(subtitle.getTypeface());
    }

    //    @Test
//    public void onCreate_addsCalendarFragment() throws Exception {
//
//    }
}