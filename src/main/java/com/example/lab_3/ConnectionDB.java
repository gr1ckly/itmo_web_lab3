package com.example.lab_3;

import lombok.Getter;
import lombok.Setter;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.logging.Logger;

@Getter
@Setter
public class ConnectionDB implements Serializable {
    private static final Logger logger = Logger.getLogger(ConnectionDB.class.getName());
    private EntityManager entityManager;
    private final String GET_ALL_USERS = "SELECT p FROM Point p";

    public ConnectionDB() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("points");
        this.entityManager = emf.createEntityManager();
    }

    @PostConstruct
    public void init() {
        logger.info("ConnectionDB init, Entity manager: " + entityManager);
    }

    public void savePoint(Point point) {
        entityManager.getTransaction().begin();
        entityManager.persist(point);
        entityManager.getTransaction().commit();
    }

    public List<Point> getAllPoints(){
        TypedQuery<Point> query = entityManager.createQuery(GET_ALL_USERS, Point.class);
        return query.getResultList();
    }
}