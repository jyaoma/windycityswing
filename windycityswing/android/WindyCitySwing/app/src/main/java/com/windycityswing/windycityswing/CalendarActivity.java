package com.windycityswing.windycityswing;

import android.graphics.Typeface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.crashes.CrashesListener;
import com.microsoft.appcenter.crashes.ingestion.models.ErrorAttachmentLog;
import com.microsoft.appcenter.crashes.model.ErrorReport;

import java.security.CryptoPrimitive;

public class CalendarActivity extends AppCompatActivity {

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

        TextView title = findViewById(R.id.title);
        Typeface titleTypeface = Typeface.createFromAsset(getAssets(), "fonts/DancingScript-Regular.otf");
        title.setTypeface(titleTypeface);
        title.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Crashes.generateTestCrash();
            }
        });

        TextView subtitle = findViewById(R.id.subtitle);
        Typeface subtitleTypeface = Typeface.createFromAsset(getAssets(), "fonts/Rampung.ttf");
        subtitle.setTypeface(subtitleTypeface);

        AppCenter.start(getApplication(), "5d5820f3-7c31-42c3-8d70-13e9fa56f81e",
                Analytics.class, Crashes.class);
        CrashesListener listener = new CrashesListener() {
            @Override
            public boolean shouldProcess(ErrorReport report) {
                return true;
            }

            @Override
            public boolean shouldAwaitUserConfirmation() {
                return false;
            }

            @Override
            public Iterable<ErrorAttachmentLog> getErrorAttachments(ErrorReport report) {
                return null;
            }

            @Override
            public void onBeforeSending(ErrorReport report) {

            }

            @Override
            public void onSendingFailed(ErrorReport report, Exception e) {

            }

            @Override
            public void onSendingSucceeded(ErrorReport report) {

            }
        };

        Crashes.setListener(listener);
        Analytics.trackEvent("App Startup");
    }
}
