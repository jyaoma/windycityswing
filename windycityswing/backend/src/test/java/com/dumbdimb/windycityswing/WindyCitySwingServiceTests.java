package com.dumbdimb.windycityswing;

import com.dumbdimb.windycityswing.domain.Dance;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Matchers.anyString;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class WindyCitySwingServiceTests {

    @Mock
    private static FileHelper fileHelper;

    private static WindyCitySwingService service;

    @Before
    public void setUp() throws FileNotFoundException {
        initMocks(this);

        service = new WindyCitySwingService(fileHelper);
    }

    @Test
    public void getAllDances__callsFileHelper() {
        File[] emptyFileList = new File[0];
        try {
            when(fileHelper.getAllFilesIn(anyString())).thenReturn(emptyFileList);
            service.getAllDances();
            verify(fileHelper).getAllFilesIn(eq("src\\main\\dances\\"));
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getAllDances__returnsOneDance() {
        File bluetopia = new File("src\\main\\dances\\monthly\\bluetopia.json");
        File[] justBluetopia = new File[1];
        justBluetopia[0] = bluetopia;
        try {
            when(fileHelper.getAllFilesIn(anyString())).thenReturn(justBluetopia);
            ArrayList<Dance> returnedDances = service.getAllDances();
            Dance bluetopiaDance = returnedDances.get(0);
            assertEquals("Bluetopia", bluetopiaDance.getTitle());
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getAllDances__returnsManyDances() {
        FileHelper realFileHelper = new FileHelper();
        try {
            File[] allSeptember2017Dances = realFileHelper.getAllFilesIn("src\\main\\dances\\2017\\09\\");
            when(fileHelper.getAllFilesIn(anyString())).thenReturn(allSeptember2017Dances);
            ArrayList<Dance> returnedDances = service.getAllDances();
            assertEquals(8, returnedDances.size());
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getDancesInMonth__queriesForAllDancesInAMonth() {
        FileHelper realFileHelper = new FileHelper();
        try {
            File[] allSeptember2017Dances = realFileHelper.getAllFilesIn("src\\main\\dances\\2017\\09\\");
            when(fileHelper.getAllFilesIn(anyString())).thenReturn(allSeptember2017Dances);
            service.getDancesInMonth(2017, 9);
            verify(fileHelper).getAllFilesIn(eq("src\\main\\dances\\weekly"));
            verify(fileHelper).getAllFilesIn(eq("src\\main\\dances\\monthly"));
            verify(fileHelper).getAllFilesIn(eq("src\\main\\dances\\2017\\09"));
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getDancesInMonth__danceDoesNotOccurThisMonth__isNotInList() {
        File firstFriday = new File("src\\main\\dances\\monthly\\first-fridays-randolph.json");
        File[] justFirstFriday = new File[1];
        justFirstFriday[0] = firstFriday;
        try {
            when(fileHelper.getAllFilesIn(eq("src\\main\\dances\\monthly"))).thenReturn(justFirstFriday);
            when(fileHelper.getAllFilesIn(eq("src\\main\\dances\\weekly"))).thenReturn(new File[0]);
            when(fileHelper.getAllFilesIn(eq("src\\main\\dances\\2017\\11"))).thenReturn(new File[0]);
            ArrayList<Dance> returnedDances = service.getDancesInMonth(2017, 11);
            assertEquals(0, returnedDances.size());
        } catch (FileNotFoundException e) {
            fail();
        }
    }
}
