package co.edu.escuelaing.cvds.lab7.service;

import co.edu.escuelaing.cvds.lab7.dto.EmployeeDTO;
import co.edu.escuelaing.cvds.lab7.repository.EmployeeRepository;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO getEmployeeById(String employeeId);

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO updateEmployee(String employeeId, EmployeeDTO updatedEmployee);

    void deleteEmployee(String employeeId);
}
