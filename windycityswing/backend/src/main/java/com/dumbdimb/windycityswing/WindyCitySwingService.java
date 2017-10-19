package com.dumbdimb.windycityswing;

import com.dumbdimb.windycityswing.domain.Dance;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

@Service
public class WindyCitySwingService {
    private final FileHelper fileHelper;

    public WindyCitySwingService(FileHelper fileHelper) {
        this.fileHelper = fileHelper;
    }

    public ArrayList<Dance> getAllDances() throws IOException {
        ArrayList<Dance> dances = new ArrayList<>();
        File[] allDances = fileHelper.getAllFilesIn("src\\main\\dances\\");
        for (File danceFile : allDances) {
            FileReader fileReader = new FileReader(danceFile);
            Dance dance = new Gson().fromJson(fileReader, Dance.class);
            dances.add(dance);
            fileReader.close();
        }
        return dances;
    }

    public ArrayList<Dance> getDancesInMonth(Integer year, Integer month) throws IOException {
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
            if (dance.getRecurrence().doesOccurInThisMonth(year, month)) {
                dances.add(dance);
            }
            fileReader.close();
        }

        for (File danceFile : monthlyDances) {
            FileReader fileReader = new FileReader(danceFile);
            Dance dance = new Gson().fromJson(fileReader, Dance.class);
            if (dance.getRecurrence().doesOccurInThisMonth(year, month)) {
                dances.add(dance);
            }
            fileReader.close();
        }

        try {
            File[] monthDances = fileHelper.getAllFilesIn("src\\main\\dances\\" + year.toString() + "\\" + monthString);

            for (File danceFile : monthDances) {
                FileReader fileReader = new FileReader(danceFile);
                Dance dance = new Gson().fromJson(fileReader, Dance.class);
                dances.add(dance);
                fileReader.close();
            }
        } catch (FileNotFoundException e) {
            System.out.println("No month specific events found.");
        }
        return dances;
    }

    public Dance getDance(String id, Integer year, Integer month, Integer day) throws FileNotFoundException {
        String monthString = month.toString();
        if (month < 10) {
            monthString = "0" + month.toString();
        }

        try {
            File[] monthDances = fileHelper.getAllFilesIn("src\\main\\dances\\" + year.toString() + "\\" + monthString);

            for (File danceFile : monthDances) {
                FileReader fileReader = new FileReader(danceFile);
                Dance dance = new Gson().fromJson(fileReader, Dance.class);
                fileReader.close();
                Integer endDay = new Integer(dance.getTimezone().getEndTimestamp().substring(6, 8));
                if (dance.getClassName().equals(id) && dance.getDate().getDay() <= day && day <= endDay) {
//                if (dance.getClassName().equals(id) && dance.getDate().getDay().equals(day)) {
                    return dance;
                }
            }
        } catch (IOException e) {
            System.out.println("No month specific events found.");
        }

        File[] monthlyDances = fileHelper.getAllFilesIn("src\\main\\dances\\monthly");
        File[] weeklyDances = fileHelper.getAllFilesIn("src\\main\\dances\\weekly");

        try {
            for (File danceFile : monthlyDances) {
                FileReader fileReader = new FileReader(danceFile);
                Dance dance = new Gson().fromJson(fileReader, Dance.class);
                fileReader.close();
                if (dance.getRecurrence().doesOccurInThisMonth(year, month) && dance.getClassName().equals(id)) {
                    return dance;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            for (File danceFile : weeklyDances) {
                FileReader fileReader = new FileReader(danceFile);
                Dance dance = new Gson().fromJson(fileReader, Dance.class);
                fileReader.close();
                if (dance.getRecurrence().doesOccurInThisMonth(year, month) && dance.getClassName().equals(id)) {
                    return dance;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
