package com.example.lab_3;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.faces.annotation.ManagedProperty;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.logging.Logger;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormBean implements Serializable {
    private static final Logger logger = Logger.getLogger(FormBean.class.getName());
    private double x, y, r=2.0;
    @ManagedProperty(value = "#{pointList}")
    private PointList pointList;

    @PostConstruct
    public void init(){
        logger.info("init FormBean");
    }

    @PreDestroy
    public void destroy(){
        logger.info("destroy FormBean");
    }

    public void submit(){
        LocalDateTime now = LocalDateTime.now();
        logger.info("submit X: " + x + ",Y: " + y + ",R: " + r);
        boolean hitting = checkHitting(x, y, r);
        pointList.addPoint(new Point(x, y, r, hitting, now));
    }

    public void clear(){
        this.x = 0.0;
        this.y = 0.0;
        this.r = 2.0;
    }

    public boolean checkHitting(double x, double y, double r){
        if (x >0 && y <= 0){
            return y >= 2 * x - r;
        } else if (x <= 0 && y > 0){
            return x * x + y * y <= r * r;
        } else if (x <=0 && y <= 0){
            return x >= -1 * r && y > -1 * r / 2;
        } else {
            return false;
        }
    }
}
