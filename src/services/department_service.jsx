import axios from "axios"
import employees_ws from "./employees_service"

const setDefaults = () =>{
    axios.defaults.headers = { 
        'Content-Type': 'application/json', 
        'x-access-token' : sessionStorage['token']
    }
}

const get_all_departments = async () => { 
    let arr = []
    setDefaults()
    const resp = await axios.get("http://127.0.0.1:5000/departments").then(resp=>{
        return resp.data.departments
    }).catch(err => {
        console.log(err['response'].data['error'])
        return arr
    })
    return resp
}

const add_department = async (departmentName, manager, manager_id)=>{
    setDefaults()
    const department = {Name: departmentName, ManagerName: manager, Manager: manager_id}
    const json_params = JSON.stringify({department: department})
    console.log("add department\n", json_params)
    await axios.post("http://127.0.0.1:5000/departments", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_department_params = async (departmentId, departmentName, manager)=>{
    setDefaults()
    const department = {id:departmentId, name: departmentName, manager: manager}
    const json_params = JSON.stringify({department: department})
    await axios.put("http://127.0.0.1:5000/departments", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_department = async (departmentId, department)=>{
    const Department = { id: departmentId, Name: department['Name'], Manager: department['managerID'], ManagerName: department["manager"]} // the new manager name must be of a real employee, and so does his ID
    const json_params = JSON.stringify({department: Department})

    await axios.put("http://127.0.0.1:5000/departments", json_params).then(resp=>{
        console.log(resp.status);
     }).catch(err => {
         console.log(err['response'].data['error'])
     })    
}

const delete_department = async (departmentId)=>{
    setDefaults()
    await axios.delete(`http://127.0.0.1:5000/departments/${departmentId}`).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    }) 
}

const get_department_employees_names = async(department_id) => {
    setDefaults()
    const employees = await employees_ws.get_all_employees()
    const resp = await axios.get(`http://127.0.0.1:5000/departments/${department_id}`).then(resp=>{
        let emp_ids = (resp.data.departments[0].employeesID).map(employee_id=>{
            const emp = employees.filter((employee)=>employee._id.$oid===employee_id)
            return `${emp[0].FirstName} ${emp[0].LastName}`
        })
        return emp_ids
     }).catch(err => {
         console.log(err['response'].data['error'])
     }) 
     return resp
}

const get_department_employees_ids = async(department_id) => {
    setDefaults()
    const resp = await axios.get(`http://127.0.0.1:5000/departments/${department_id}`).then(resp=>{
       return resp.data.departments[0].employeesID
     }).catch(err => {
         console.log(err['response'].data['error'])
     }) 
     return resp
}


const departments_ws = {
    get_all_departments,
    get_department_employees_ids,
    get_department_employees_names,
    add_department,
    delete_department,
    update_department,
    update_department_params
}

export default departments_ws