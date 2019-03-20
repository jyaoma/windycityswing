package com.windycityswing.windycityswing;

import android.graphics.Typeface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;

import net.hockeyapp.android.CrashManager;
import net.hockeyapp.android.metrics.MetricsManager;

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

        MetricsManager.register(getApplication());
        MetricsManager.trackEvent("App startup");
    }

    @Override
    protected void onResume() {
        super.onResume();
        checkForCrashes();
    }

    private void checkForCrashes() {
        CrashManager.register(this);
    }
}
