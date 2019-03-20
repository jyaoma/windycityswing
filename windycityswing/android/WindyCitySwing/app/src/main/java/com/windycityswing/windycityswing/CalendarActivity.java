package com.windycityswing.windycityswing;

import android.graphics.Typeface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;

public class CalendarActivity extends AppCompatActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

        TextView title = findViewById(R.id.title);
        Typeface titleTypeface = Typeface.createFromAsset(getAssets(), "fonts/DancingScript-Regular.otf");
        title.setTypeface(titleTypeface);

        TextView subtitle = findViewById(R.id.subtitle);
        Typeface subtitleTypeface = Typeface.createFromAsset(getAssets(), "fonts/Rampung.ttf");
        subtitle.setTypeface(subtitleTypeface);

        AppCenter.start(getApplication(), "5d5820f3-7c31-42c3-8d70-13e9fa56f81e",
                Analytics.class, Crashes.class);
        Analytics.trackEvent("App Startup");
    }
}
