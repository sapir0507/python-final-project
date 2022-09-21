import axios from "axios"

axios.defaults.headers.post = { 'Content-Type': 'application/json'}

const login_with_username_and_email = async (username, email) => { 
    const json_params = JSON.stringify({username: username, email: email})
    const resp = await axios.post("http://127.0.0.1:5000/auth/login", json_params).then(resp=>{
        sessionStorage["token"] = resp.data.token;
        return true
    }).catch(err => {
        return false
    });
    return resp
    
}


const auth = {
    login_with_username_and_email
}

export default auth