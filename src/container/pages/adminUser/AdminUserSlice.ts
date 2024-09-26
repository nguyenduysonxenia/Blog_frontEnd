import {createSlice} from '@reduxjs/toolkit'

const AdminUserSlice = createSlice({
  name: 'adminUserPage',
  initialState: {
    listUser: [],
    pagination: {
      page:1,
      limit:6,
      total:1,
    },
  },
  reducers:{
    setListUser: (state,action)=>{
      state.listUser = action.payload
    },
    setPagination: (state,action)=>{
      state.pagination  = action.payload;
    },
    setUser : (state: any,action: any)=>{
      const payload: any = action.payload
      const index = state.listUser.findIndex((user:any)=>user._id.toString() === payload._id.toString())
      state.listUser.splice(index,1,payload);
      return state
    },
  }
})

const {reducer, actions} = AdminUserSlice;
export const {setListUser,setPagination,setUser} = actions;
export default reducer;
