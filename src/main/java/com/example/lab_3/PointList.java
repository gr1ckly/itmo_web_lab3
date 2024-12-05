package com.example.lab_3;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.util.List;
import java.util.logging.Logger;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PointList implements Serializable {
    private static final Logger logger = Logger.getLogger(PointList.class.getName());
    private ConnectionDB connectionDB;

    @PostConstruct
    public void init(){
        logger.info("PointList init");
    }

    public List<Point> getAllPoints(){
        return this.connectionDB.getAllPoints();
    }

    public void addPoint(Point point){
        this.connectionDB.savePoint(point);
        logger.info("PointList addPoint: " + point);
    }
}
