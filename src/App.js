// import { Routes, Route, Outlet } from "react-router-dom";
// import LoginComp from "./components/login";

import { Box } from "@mui/material";
import { 
  Outlet, 
  Routes,
  Route
} from "react-router-dom";
import DashboardComp from "./components/dashboard";
import DepartmentComp from "./components/department";
import EditDepartmentComp from "./components/editDepartment";
import EditEmployee from "./components/editEmployee";
import EmployeesComp from "./components/employees";
import LoginComp from "./components/login";
import NewDepartmentComp from "./components/newDepartment";
import NewEmployee from "./components/newEmployee";
import NavbarComp from "./components/shared/navbar";
import ShiftComp from "./components/shifts";
import UsersComp from "./components/users";


function App() {
  return (
    <Box component='div'>
      <NavbarComp></NavbarComp>
      <Outlet></Outlet>
      <Routes>
        <Route path='/' element={<DashboardComp/>} />
        <Route path='/login' element={<LoginComp/>} />
        <Route path='/employees' element={<EmployeesComp/>} />
        <Route path='/departments' element={<DepartmentComp/>} />
        <Route path='/new-employee' element={<NewEmployee/>} />
        <Route path='/new-department' element={<NewDepartmentComp/>} />
        <Route path='/edit-employee/:fullName' element={<EditEmployee/>} />
        <Route path='/edit-department/:department' element={<EditDepartmentComp/>} />
        <Route path='/shifts' element={<ShiftComp/>} />
        <Route path='/users' element={<UsersComp/>} />
      </Routes>
    </Box>
    
  );
}

export default App;
