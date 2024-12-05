package com.example.lab_3;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;

@Entity
@Table(name="points")
@ToString
@Getter
@Setter
@NoArgsConstructor
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="x", nullable = false)
    private double x;
    @Column(name="y", nullable = false)
    private double y;
    @Column(name="r", nullable = false)
    private double r;
    @Column(name="inArea", nullable = false)
    private boolean inArea;
    @Column(name="start_time", nullable = false)
    private LocalDateTime startTime;
    @Column(name="processed_time", nullable = false)
    private long processedTime;

    public Point(double x, double y, double r, boolean hitting, LocalDateTime startTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = hitting;
        this.startTime = startTime;
        this.processedTime = Duration.between(startTime, LocalDateTime.now()).toMillis();
    }
}
