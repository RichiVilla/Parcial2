package co.edu.escuelaing.cvds.lab7.service;

import co.edu.escuelaing.cvds.lab7.model.Employee;
import co.edu.escuelaing.cvds.lab7.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Prueba {
    private final EmployeeRepository employeeRepository;

    @Autowired
    public Prueba(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee getEmployee(String employee_ID) {
        return employeeRepository.findById(employee_ID).get();
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }


    public Employee updateEmployee(Employee employee) {
        if (employeeRepository.findByEmployeeId(employee.getEmployee_Id()).isEmpty()) {
            return employeeRepository.save(employee);
        }

        return null;
    }

    public void deleteEmployee(String employee_ID) {
        employeeRepository.deleteById(employee_ID);
    }

    public String getFirstName() {
        return employeeRepository.findByEmployeeId("1").get(0).getFirstname();
    }

}