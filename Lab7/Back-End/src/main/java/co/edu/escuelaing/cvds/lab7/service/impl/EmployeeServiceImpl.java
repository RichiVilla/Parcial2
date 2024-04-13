package co.edu.escuelaing.cvds.lab7.service.impl;

import co.edu.escuelaing.cvds.lab7.dto.EmployeeDTO;
import co.edu.escuelaing.cvds.lab7.mapper.EmployeeMapper;
import co.edu.escuelaing.cvds.lab7.model.Employee;
import co.edu.escuelaing.cvds.lab7.repository.EmployeeRepository;
import co.edu.escuelaing.cvds.lab7.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import co.edu.escuelaing.cvds.lab7.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exixsts with given id: " + employeeId));

        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDTO(employee)).collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(String employeeId, EmployeeDTO updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exixsts with given id: " + employeeId));
        employee.setFirstname(updatedEmployee.getFirstname());
        employee.setLastname(updatedEmployee.getLastname());
        employee.setRole(updatedEmployee.getRole());
        employee.setSalary(updatedEmployee.getSalary());

        Employee updatedEmployeeObj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDTO(updatedEmployeeObj);

    }

    @Override
    public void deleteEmployee(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee is not exixsts with given id: " + employeeId));
        employeeRepository.delete(employee);
    }
}
