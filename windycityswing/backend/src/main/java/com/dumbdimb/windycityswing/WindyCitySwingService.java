package com.dumbdimb.windycityswing;

import com.dumbdimb.windycityswing.domain.Dance;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;

@Service
public class WindyCitySwingService {
    private final FileHelper fileHelper;

    public WindyCitySwingService(FileHelper fileHelper) {
        this.fileHelper = fileHelper;
    }

    public ArrayList<Dance> getAllDances() throws FileNotFoundException{
        ArrayList<Dance> dances = new ArrayList<>();
        File[] allDances = fileHelper.getAllFilesIn("src\\main\\dances\\");
        for (File danceFile : allDances) {
            FileReader fileReader = new FileReader(danceFile);
            Dance dance = new Gson().fromJson(fileReader, Dance.class);
            dances.add(dance);
        }
        return dances;
    }

    public ArrayList<Dance> getDancesInMonth(Integer year, Integer month) throws FileNotFoundException {
        String monthString = month.toString();
        if (month < 10) {
            monthString = "0" + month.toString();
        }
        ArrayList<Dance> dances = new ArrayList<>();
        File[] weeklyDances = fileHelper.getAllFilesIn("src\\main\\dances\\weekly");
        File[] monthlyDances = fileHelper.getAllFilesIn("src\\main\\dances\\monthly");

        for (File danceFile : weeklyDances) {
            FileReader fileReader = new FileReader(danceFile);
            Dance dance = new Gson().fromJson(fileReader, Dance.class);
            dances.add(dance);
        }

        for (File danceFile : monthlyDances) {
            FileReader fileReader = new FileReader(danceFile);
            Dance dance = new Gson().fromJson(fileReader, Dance.class);
            dances.add(dance);
        }

        try {
            File[] monthDances = fileHelper.getAllFilesIn("src\\main\\dances\\" + year.toString() + "\\" + monthString);

            for (File danceFile : monthDances) {
                FileReader fileReader = new FileReader(danceFile);
                Dance dance = new Gson().fromJson(fileReader, Dance.class);
                dances.add(dance);
            }
        } catch (FileNotFoundException e) {
            System.out.println("No month specific events found.");
        }
        return dances;
    }
}
