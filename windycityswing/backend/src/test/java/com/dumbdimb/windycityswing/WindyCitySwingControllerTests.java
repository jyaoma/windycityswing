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
import java.io.IOException;

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
        } catch (IOException e) {
            fail();
        }
    }

    @Test
    public void getDancesInMonth_callsService() {
        try {
            controller.getDancesInMonth(2016, 10);

            verify(service).getDancesInMonth(eq(2016), eq(10));
        } catch (IOException e) {
            fail();
        }
    }

    @Test
    public void getDance_callsService() {
        try {
            controller.getDance("dance-id", 2017, 10, 25);

            verify(service).getDance(eq("dance-id"), eq(2017), eq(10), eq(25));
        } catch (IOException e) {
            fail();
        }
    }
}