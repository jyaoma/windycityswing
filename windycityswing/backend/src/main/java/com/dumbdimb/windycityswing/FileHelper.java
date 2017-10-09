package com.dumbdimb.windycityswing;

import org.apache.commons.lang3.ArrayUtils;

import java.io.File;
import java.io.FileNotFoundException;

public class FileHelper {
    public File[] getShallowListOfFilesIn(String directory) throws FileNotFoundException {
        File file = new File(directory);
        return getShallowListOfFilesIn(file);
    }

    public File[] getShallowListOfFilesIn(File file) throws FileNotFoundException {
        if (file.isFile()) {
            File[] result = new File[1];
            result[0] = file;
            return result;
        } else if (file.isDirectory()) {
            return file.listFiles();
        } else throw new FileNotFoundException("The file or folder could not be found.");
    }

    public File[] getAllFilesIn(String directory) throws FileNotFoundException {
        File directoryFile = new File(directory);
        return getAllFilesIn(directoryFile);
    }

    public File[] getAllFilesIn(File directoryFile) throws FileNotFoundException {
        if (directoryFile.isFile()) {
            File[] result = new File[1];
            result[0] = directoryFile;
            return result;
        } else if (directoryFile.isDirectory()) {
            File[] result = new File[0];
            File[] currentDirectoryFiles = getShallowListOfFilesIn(directoryFile);
            for (File subFile : currentDirectoryFiles) {
                result = ArrayUtils.addAll(result, getAllFilesIn(subFile));
            }
            return result;
        } else throw new FileNotFoundException("The file or folder could not be found.");
    }
}
