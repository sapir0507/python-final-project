import axios from "axios"

const date = new Date()

const logEvent = async(session, _event) => { 
    const event = {
        id: session.user.user_id,
        maxActions: session.actions.maxActions,
        date: `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`,
        actionAllowed: session.actions.currentActions,
        details: _event
    }
    const json_params = JSON.stringify({log: event})
    console.log("add department\n", json_params)
    await axios.post("http://127.0.0.1:5000/log", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const log_service = {
    logEvent
}

export default log_service