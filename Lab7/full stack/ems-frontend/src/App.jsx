import './App.css'
import HelloWorld from './HelloWorld'
import EmployeeComponent from './components/EmployeeComponent'
import ListEMployeeComponent from './components/ListEMployeeComponent'
import { BrowserRouter, Routes , Route} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* // http://localhost:3000 */}
        <Route path='/' element = {<ListEMployeeComponent />}></Route>
        {/* // http://localhost:3000/employees */}
        <Route path='/employees' element = {<ListEMployeeComponent />}></Route>
        {/* // http://localhost:3000/add-employee */}
        <Route path='/add-employee' element = {<EmployeeComponent />}></Route>
        {/* // http://localhost:3000/update-employee/1 */}
        <Route path='/update-employee/:id' element = {<EmployeeComponent />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
