package com.windycityswing.windycityswing;

import android.content.Context;
import android.graphics.Typeface;
import android.support.test.InstrumentationRegistry;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.widget.TextView;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.assertion.ViewAssertions.matches;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withText;
import static org.junit.Assert.*;

/**
 * Instrumentation test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(AndroidJUnit4.class)
public class CalendarUITest {

    @Test
    public void useAppContext() throws Exception {
        // Context of the app under test.
        Context appContext = InstrumentationRegistry.getTargetContext();

        assertEquals("com.windycityswing.windycityswing", appContext.getPackageName());
    }

    @Rule
    public ActivityTestRule<Calendar> activityTestRule = new ActivityTestRule<>(Calendar.class);

    @Test
    public void hasTitle() {
        onView(withText("Windy City Swing")).check(matches(isDisplayed()));
    }

    @Test
    public void hasSubtitle() {
        onView(withText("THE SWING DANCING INFORMATION IN CHICAGO AND CHICAGOLAND AREA")).check(matches(isDisplayed()));
    }

    @Test
    public void titleFontIsChanged() {
        TextView title = activityTestRule.getActivity().findViewById(R.id.title);
        assertNotNull(title.getTypeface());
    }

    @Test
    public void subtitleFontIsChanged() {
        TextView subtitle = activityTestRule.getActivity().findViewById(R.id.subtitle);
        assertNotNull(subtitle.getTypeface());
    }
}
