package com.dumbdimb.windycityswing;

import org.junit.Test;

import java.io.File;
import java.io.FileNotFoundException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class FileHelperTest {
    private static final String baseDirectory = "src\\main\\dances\\";
    private static final String fileDirectory = "src\\main\\dances\\monthly\\bluetopia.json";
    private static final String september2017Directory = "src\\main\\dances\\2017\\09";

    private final FileHelper fileHelper = new FileHelper();

    @Test
    public void getListOfFilesIn_whenGivenDirectory_returnsListOfFiles() {
        try {
            File[] listOfFiles = fileHelper.getShallowListOfFilesIn(baseDirectory);
            assertEquals(3, listOfFiles.length);
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getListOfFilesIn_whenGivenFile_returnsFile() {
        try {
            File[] listOfFiles = fileHelper.getShallowListOfFilesIn(fileDirectory);
            assertEquals(1, listOfFiles.length);
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test(expected = FileNotFoundException.class)
    public void getListOfFilesIn_whenGivenInvalidPath_throwsException() throws FileNotFoundException {
        fileHelper.getShallowListOfFilesIn("nonsense");
    }

    @Test
    public void getAllFilesIn_whenGivenDirectory_returnsAllFiles() {
        try {
            File[] files = fileHelper.getAllFilesIn(september2017Directory);
            assertEquals(8, files.length);
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test(expected = FileNotFoundException.class)
    public void getAllFilesIn_whenGivenInvalidPath_throwsException() throws FileNotFoundException {
        fileHelper.getAllFilesIn("nonsense");
    }
}
