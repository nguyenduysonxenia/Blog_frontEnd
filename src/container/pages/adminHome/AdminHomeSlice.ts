import {createSlice} from '@reduxjs/toolkit'

const AdminHomeSlice = createSlice({
  name: 'detailPage',
  initialState: {
    listPost: [],
    pagination: {
      page:1,
      limit:6,
      total:1,
    },
    views:{
      countUser: 0,
      countPost: 0
    }
  },
  reducers:{
    setListPost: (state,action)=>{
      state.listPost = action.payload
    },
    setPagination: (state,action)=>{
      state.pagination  = action.payload;
    },
    setPost : (state: any,action: any)=>{
      const payload: any = action.payload
      const index = state.listPost.findIndex((post:any)=>post._id.toString() === payload._id.toString())
      state.listPost.splice(index,1,payload);
      return state
    },
    setView:(state: any,action: any)=>{
      state.views  = action.payload;
    }
  }
})

const {reducer, actions} = AdminHomeSlice;
export const {setListPost,setPagination,setPost,setView} = actions;
export default reducer;
