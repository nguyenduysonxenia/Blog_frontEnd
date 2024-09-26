import {createSlice} from '@reduxjs/toolkit'
const User = createSlice({
  name: 'User',
  initialState: {
    id: null,
    username: null,
    avatar: null,
    admin: null
  },
  reducers:{
    setCurrentUser: (state,action)=>{
      state = action.payload
      return state
    },
    logout: (state,action)=>{
      localStorage.removeItem("accessToken");
      state = action.payload
      return state
    }
  }
})

const {reducer, actions} = User;
export const {setCurrentUser,logout} = actions;
export default reducer;
