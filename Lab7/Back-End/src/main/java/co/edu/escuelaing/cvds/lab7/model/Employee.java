package co.edu.escuelaing.cvds.lab7.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "EMPLOYEE")
public class Employee {
    @Id
    @Column(name = "EMPLOYEE_ID")
    @Getter
    @Setter
    private String employeeId;
    @Column(name = "FIRST_NAME")
    @Getter
    @Setter
    private String firstname;
    @Getter
    @Setter
    @Column(name = "LAST_NAME")
    private String lastname;
    @Getter
    @Setter
    @Column(name = "ROLE")
    private String role;
    @Column(name = "SALARY")
    @Getter
    @Setter
    private Double salary;

    public Employee() {
    }

    public Employee(String employeeId, String firstname, String lastname, String role, Double salary){
        this.employeeId = employeeId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.role = role;
        this.salary = salary;
    }



    public static Employee getEmployeeByNameOrLastName(String nameOrLastName) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("EmployeePU");
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        try {
            entityManager.getTransaction().begin();
            Query query = entityManager.createQuery("SELECT e FROM Employee e WHERE e.first_name = :nameOrLastName OR e.last_name = :nameOrLastName");
            query.setParameter("nameOrLastName", nameOrLastName);
            Employee employee = (Employee) query.getSingleResult();
            entityManager.getTransaction().commit();
            return employee;
        } catch (Exception e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
            return null;
        } finally {
            entityManager.close();
            entityManagerFactory.close();
        }
    }

    public String getEmployee_Id() { return employeeId;
    }
}