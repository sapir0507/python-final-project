import axios from "axios"

const setDefaults = () =>{
    axios.defaults.headers = { 
        'Content-Type': 'application/json', 
        'x-access-token' : sessionStorage['token']
    }
}

const get_all_employees = async () => { 
    let arr = []
    setDefaults()
    const resp = await axios.get("http://127.0.0.1:5000/employees").then(resp=>{
        return resp.data.employees
    }).catch(err => {
        console.log(err['response'].data['error'])
        return arr
    })
    return resp
}


const get_employee = async (id) => { 
    const _r = await axios.get("http://127.0.0.1:5000/employees", JSON.stringify({
        "id": id
    }))
    console.log("_r", _r);
    const _resp = await get_all_employees()
    const resp = _resp.filter(emp=>emp._id.$oid===id)
    return resp[0]
}

const add_employee = async (FirstName, LastName, StartWorkYear, DepartmentID)=>{
    setDefaults()
    const employee = {
        FirstName: FirstName, 
        LastName: LastName, 
        StartWorkYear: StartWorkYear, 
        DepartmentID: DepartmentID
    }
    const json_params = JSON.stringify({employee: employee})
    console.log("add department\n", json_params)
    await axios.post("http://127.0.0.1:5000/employees", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const add_employee_to_shift = async (employeeId, shiftId)=>{
    setDefaults()
    const employee = {
        employeeId: employeeId, 
        shiftId: shiftId
    }
    const json_params = JSON.stringify({employee: employee})
    console.log("add employee to shift\n", json_params)
    await axios.post("http://127.0.0.1:5000/employees/add-to-shift", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const add_employee_to_department = async (employeeId, department_id)=>{
    setDefaults()
    const employee = {
        employeeId: employeeId, 
        department_id: department_id
    }
    const json_params = JSON.stringify({employee: employee})
    console.log("add employee to department\n", json_params)
    await axios.post("http://127.0.0.1:5000/employees/add-to-department", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_employee_params = async (employeeId, FirstName, LastName, StartWorkYear, DepartmentID)=>{
    setDefaults()
    const employee = {
        id: employeeId, 
        FirstName: FirstName, 
        LastName: LastName, 
        StartWorkYear:StartWorkYear, 
        DepartmentID:DepartmentID
    }
    const json_params = JSON.stringify({employee: employee})
    await axios.post("http://127.0.0.1:5000/employees", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_employee = async (employeeId, employee)=>{
    const Employee = { 
        id: employeeId, 
        LastName: employee['LastName'], 
        FirstName: employee['FirstName'],
        StartWorkYear: employee['StartWorkYear'],
        DepartmentID: employee['DepartmentID'],
    }
    await update_employee_params(Employee)
}

const delete_employee = async (employeeId)=>{
    setDefaults()
    await axios.delete(`http://127.0.0.1:5000/employees/${employeeId}`).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    }) 
}


const employees_ws = {
    get_all_employees,
    get_employee,
    add_employee,
    add_employee_to_shift,
    add_employee_to_department,
    delete_employee,
    update_employee,
    update_employee_params
}

export default employees_ws