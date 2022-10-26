// import { Routes, Route, Outlet } from "react-router-dom";
// import LoginComp from "./components/login";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { 
  Outlet, 
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import DashboardComp from "./components/dashboard";
import DepartmentComp from "./components/department";
import EditDepartmentComp from "./components/editDepartment";
import EditEmployee from "./components/editEmployee/editEmployee";
import EmployeesComp from "./components/employees";
import LoginComp from "./components/login";
import NewDepartmentComp from "./components/newDepartment";
import NewEmployee from "./components/newEmployee";
import NavbarComp from "./components/shared/navbar";
import ShiftComp from "./components/shifts";
import UsersComp from "./components/users";


function App() {
  const [loggedin, setLoggedin] = useState(false)
  const state = useSelector((state) => state.session);

  useEffect(() => {
    if(state.session['token']!=="")
      setLoggedin(true) 
    else
      setLoggedin(false)
    
  }, [state])
  
  return (
    <Box component='div'>
      <NavbarComp></NavbarComp>
      <Outlet></Outlet>
      <Routes>
        <Route path='/' element={!loggedin? <Navigate to="/login"></Navigate>: <DashboardComp/>} />
        <Route path='/login' element={<LoginComp/>} />
        <Route path='/dashboard' 
          element={!loggedin? <Navigate to="/login"></Navigate>: <DashboardComp/>} />
        <Route path='/employees' 
          element={!loggedin? <Navigate to="/login"></Navigate>: <EmployeesComp/>} />
        <Route path='/departments'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<DepartmentComp/>} />
        <Route path='/new-employee'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<NewEmployee/>} />
        <Route path='/new-department'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<NewDepartmentComp/>} />
        <Route path='/edit-employee/:fullName'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<EditEmployee/>} />
        <Route path='/edit-department/:department'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<EditDepartmentComp/>} />
        <Route path='/shifts'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<ShiftComp/>} />
        <Route path='/users'  
          element={!loggedin? <Navigate to="/login"></Navigate>:<UsersComp/>} />
      </Routes>
    </Box>
    
  );
}

export default App;
