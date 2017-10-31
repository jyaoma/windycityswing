package com.windycityswing.windycityswing

import android.graphics.Typeface
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.TextView

class Calendar : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_calendar)

        val title = findViewById(R.id.title) as TextView
        val titleTypeface = Typeface.createFromAsset(assets, "fonts/DancingScript-Regular.otf")
        title.typeface = titleTypeface

        val subtitle = findViewById(R.id.subtitle) as TextView
        val subtitleTypeface = Typeface.createFromAsset(assets, "fonts/Rampung.ttf")
        subtitle.typeface = subtitleTypeface
    }
}
