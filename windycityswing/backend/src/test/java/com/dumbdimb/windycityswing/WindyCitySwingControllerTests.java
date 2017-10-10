package com.dumbdimb.windycityswing;

import static org.junit.Assert.*;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.MockitoAnnotations.initMocks;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.io.FileNotFoundException;

public class WindyCitySwingControllerTests {

    @Mock
    private static WindyCitySwingService service;

    private static WindyCitySwingController controller;

    @Before
    public void setUp() {
        initMocks(this);

        controller = new WindyCitySwingController(service);
    }

    @Test
    public void getAllDances_callsService() {
        try {
            controller.getAllDances();

            verify(service).getAllDances();
        } catch (FileNotFoundException e) {
            fail();
        }
    }

    @Test
    public void getDancesInMonth_callsService() {
        try {
            controller.getDancesInMonth(2016, 10);

            verify(service).getDancesInMonth(eq(2016), eq(10));
        } catch (FileNotFoundException e) {
            fail();
        }
    }
}