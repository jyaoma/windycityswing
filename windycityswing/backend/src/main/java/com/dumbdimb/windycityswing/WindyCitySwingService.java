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
}
