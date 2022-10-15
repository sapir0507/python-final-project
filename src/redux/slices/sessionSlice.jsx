import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: {
    token: "",
    user: {
      username: "",
      email: "",
      FirstName: "",
      LastName: "",
      id: ""
    },
    actions:{
      currentActions: 0,
      maxActions: 0
    }
  },
};

export const sessionSlice = createSlice({
  name: 'session', // a string name to identify the slice
  initialState,
  reducers: {
    // reducer functions to define how the state can be updated
    setToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const session = state.session
      const a = {...state, session: {
        ...session,
        token: action.payload
      }}   
      
      return a
    },
    setUser: (state, action)=>{
        const session = state.session
        const a = {...state, session: {
        ...session,
        user: action.payload
      }} 
      return a
    },
    setActions: (state, action)=>{
      const session = state.session
      const a = {...state, session: {
      ...session,
      actions: action.payload
    }} 
    return a
  }    
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser, setActions } = sessionSlice.actions;

export default sessionSlice.reducer;

// reference: https://redux.js.org/tutorials/quick-start