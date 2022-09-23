import axios from "axios"

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

const add_department = async (departmentName, manager)=>{
    setDefaults()
    const department = {name: departmentName, manager: manager}
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
    const Department = { id: departmentId, name: department['Name'], manager: department['manager']}
    await update_department_params(Department)
}

const delete_department = async (departmentId)=>{
    setDefaults()
    await axios.delete(`http://127.0.0.1:5000/departments/${departmentId}`).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    }) 
}


const departments_ws = {
    get_all_departments,
    add_department,
    delete_department,
    update_department,
    update_department_params
}

export default departments_ws