package co.edu.escuelaing.cvds.lab7.mapper;

import co.edu.escuelaing.cvds.lab7.dto.EmployeeDTO;
import co.edu.escuelaing.cvds.lab7.model.Employee;

public class EmployeeMapper {
    public static EmployeeDTO mapToEmployeeDTO(Employee employee){
        return new EmployeeDTO(
                employee.getEmployeeId(),
                employee.getFirstname(),
                employee.getLastname(),
                employee.getRole(),
                employee.getSalary()
        );
    }

    public static Employee mapToEmployee(EmployeeDTO employeeDTO){
        return new Employee(
                employeeDTO.getEmployeeId(),
                employeeDTO.getFirstname(),
                employeeDTO.getLastname(),
                employeeDTO.getRole(),
                employeeDTO.getSalary()
        );
    }
}
