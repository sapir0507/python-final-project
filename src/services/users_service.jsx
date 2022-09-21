import axios from "axios"

const setDefaults = () =>{
    axios.defaults.headers = { 
        'Content-Type': 'application/json', 
        'x-access-token' : sessionStorage['token']
    }
}

const get_all_users = async () => { 
    let arr = []
    setDefaults()
    const resp = await axios.get("http://127.0.0.1:5000/users").then(resp=>{
        return resp.data.users
    }).catch(err => {
        console.log(err['response'].data['error'])
        return arr
    })
    return resp
}

const get_user_by_FullName = async (FullName) => { 
    let arr = await get_all_users()
    let resp = arr.filter(user=>user["FullName"]===FullName)
    return resp
}



const users_ws = {
    get_all_users,
    get_user_by_FullName
}

export default users_ws