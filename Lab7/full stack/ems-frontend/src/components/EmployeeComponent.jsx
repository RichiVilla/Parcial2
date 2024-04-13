import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeServices';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const navigator = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id){
        getEmployee(id).then((response) => {
            setEmployeeId(response.data.employeeId);
            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
            setRole(response.data.role);
            setSalary(response.data.salary);
        }).catch(error => {
            console.error(error)
        })
    }
  }, [id])

  const [errors, setErrors] = useState({
    employeeId : '',
    firstname : '',
    lastname : '',
    role : '',
    salary : ''
  })

  function saveorUpdateEmployee(e) {
    e.preventDefault();

    if(validateForm()){
        const employee = {employeeId,firstname,lastname,role,salary};
        console.log(employee)

        if(id){
            updateEmployee(employeeId, employee).then((response) => {
                console.log(response.data);
                navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
        } else{
            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees');
              }).catch(eror => {
                console.error(error);
              })
        }
        
    }
  }

  function validateForm(){
    let valid = true;

    const errorsCopy = {... errors}

    if(employeeId.trim()){
        errorsCopy.employeeId = '';
    } else {
        errorsCopy.employeeId = 'Id is required';
        valid = false;
    }

    if(firstname.trim()){
        errorsCopy.firstname = '';
    } else {
        errorsCopy.firstname = 'First name is required';
        valid = false;
    }

    if(lastname.trim()){
        errorsCopy.lastname = '';
    } else {
        errorsCopy.lastname = 'Last name is required';
        valid = false;
    }

    if(role.trim()){
        errorsCopy.role = '';
    } else {
        errorsCopy.role = 'Role is required';
        valid = false;
    }

    if(String(salary).trim()){
        errorsCopy.salary = '';
    } else {
        errorsCopy.salary = 'First name is required';
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle(){
    if(id)
        return <h1 className='text-left'>Update Employee {id}</h1>;
    else {return <h1 className='text-left'>Add Employee</h1>
    }
  }

  function buttonText(){
    if(id)
        {return <button className='btn btn-success' onClick={saveorUpdateEmployee}>
                UPDATE
              </button> } 
    else {return <button className='btn btn-success' onClick={saveorUpdateEmployee}>
                CREATE
              </button>    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='card'>
            {
                pageTitle()
            }
          <div className='card-body'>
            <form>
            <div className='form-group mb-2'>
            <label className='form-label'>Employee ID:</label>
            <input
                type='text'
                placeholder='Enter Employee Id'
                name='EmployeeId'
                value={employeeId}
                readOnly={!!id} // Si id existe, establece readOnly a true
                className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                onChange={(e) => setEmployeeId(e.target.value)}
            />
            {errors.employeeId && <div className='invalid-feedback'> {errors.employeeId}</div>}
            </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Employee First Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee First Name'
                  name='firstname'
                  value={firstname}
                  className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                { errors.firstname && <div className='invalid-feedback'> {errors.firstname}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Employee Last Name:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Last Name'
                  name='lastName'
                  value={lastname}
                  className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                { errors.lastname && <div className='invalid-feedback'> {errors.lastname}</div>}
              </div>

              <div className='form-group mb-2'>
                <label className='form-label'>Employee Role:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Role'
                  name='role'
                  value={role}
                  className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  onChange={(e) => setRole(e.target.value)}
                />
                { errors.role && <div className='invalid-feedback'> {errors.role}</div>}

              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Employee Salary:</label>
                <input
                  type='text'
                  placeholder='Enter Employee Salary'
                  name='salary'
                  value={salary}
                  className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                  onChange={(e) => setSalary(e.target.value)}
                />
                { errors.salary && <div className='invalid-feedback'> {errors.salary}</div>}
              </div>
              {
                buttonText()
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;