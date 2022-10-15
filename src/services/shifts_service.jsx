import axios from "axios"

const setDefaults = () =>{
    axios.defaults.headers = { 
        'Content-Type': 'application/json', 
        'x-access-token' : sessionStorage['token']
    }
}

const get_all_shifts = async () => { 
    let arr = []
    setDefaults()
    const resp = await axios.get("http://127.0.0.1:5000/shifts").then(resp=>{
        return resp.data.shifts
    }).catch(err => {
        console.log(err['response'].data['error'])
        return arr
    })
    return resp
}

const get_shift = async (shiftID) => { 
    let arr = []
    setDefaults()
    const resp = await axios.get(`http://127.0.0.1:5000/shifts/${shiftID}`).then(resp=>{
        return resp.data.shift
    }).catch(err => {
        console.log(err['response'].data['error'])
        return arr
    })
    return resp
}

const add_shift = async (Date, StartingHour, EndingHour)=>{
    setDefaults()
    const shift = {Date: Date, StartingHour: StartingHour, EndingHour:EndingHour}
    const json_params = JSON.stringify({shift: shift})
    console.log("add shift\n", json_params)
    await axios.post("http://127.0.0.1:5000/shifts", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_shift_params = async (shiftID, Date, StartingHour, EndingHour)=>{
    setDefaults()
    const shift = {id:shiftID, Date: Date, StartingHour: StartingHour, EndingHour:EndingHour}
    const json_params = JSON.stringify({shift: shift})
    await axios.put("http://127.0.0.1:5000/shifts", json_params).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    })
    
}

const update_shift = async (shiftId, shifts)=>{
    const Shift = { 
        id: shiftId, 
        Date: shifts['Date'], 
        StartingHour: shifts['StartingHour'],
        EndingHour: shifts['EndingHour'],
    }
    await update_shift(shiftId, Shift)
}

const delete_shift = async (shiftsId)=>{
    setDefaults()
    await axios.delete(`http://127.0.0.1:5000/shifts/${shiftsId}`).then(resp=>{
       console.log(resp.status);
    }).catch(err => {
        console.log(err['response'].data['error'])
    }) 
}


const shifts_ws = {
    get_all_shifts,
    get_shift,
    add_shift,
    delete_shift,
    update_shift,
    update_shift_params
}

export default shifts_ws