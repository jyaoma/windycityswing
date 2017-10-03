package com.dumbdimb.windycityswing;

import static org.junit.Assert.*;

import org.junit.Test;

public class WindyCitySwingControllerTest {

	@Test
	public void home_returnsHelloWorld() {
		WindyCitySwingController windyCitySwingController = new WindyCitySwingController();
		
		assertEquals("Hello World!", windyCitySwingController.home());
	}

}
