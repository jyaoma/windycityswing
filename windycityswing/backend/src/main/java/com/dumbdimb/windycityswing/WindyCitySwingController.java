package com.dumbdimb.windycityswing;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.dumbdimb.windycityswing.domain.Dance;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

@CrossOrigin(origins="*")
@RestController
@EnableAutoConfiguration
public class WindyCitySwingController {
    private final WindyCitySwingService windyCitySwingService;

    @Autowired
    public WindyCitySwingController (WindyCitySwingService service) {
        this.windyCitySwingService = service;
    }
    
    @RequestMapping (
    		value="/dances",
    		method=RequestMethod.GET,
    		produces=MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    ArrayList<Dance> getAllDances() throws IOException {
        return windyCitySwingService.getAllDances();
    }

    @RequestMapping (
            value="/dances",
            params = {"year", "month"},
            method=RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    ArrayList<Dance> getDancesInMonth(@RequestParam(value = "year") Integer year,
                                      @RequestParam(value = "month") Integer month) throws IOException {
        return windyCitySwingService.getDancesInMonth(year, month);
    }

    @RequestMapping (
            value="/dances",
            params = {"id", "year", "month"},
            method=RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Dance getDance(@RequestParam(value="id") String id,
                          @RequestParam(value="year") Integer year,
                          @RequestParam(value="month") Integer month) throws FileNotFoundException {
        return windyCitySwingService.getDance(id, year, month);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(WindyCitySwingController.class, args);
    }
}
