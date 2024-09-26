import {createSlice} from '@reduxjs/toolkit'

const Home = createSlice({
  name: 'homePage',
  initialState: {
    listPost: {},
    pagination:{
      page: 1,
      limit:6,
      total:1
    },
    listPostNew: [],
    listPostHot:[],
    listPostSearch:[],
  },
  reducers:{
    getListPost: (state,action)=>{
      state.listPost = action.payload
    },
    getlistPostNew: (state,action)=>{
      state.listPostNew = action.payload
    },
    getListPostHot: (state,action)=>{
      state.listPostHot = action.payload
    },
    getListPostSearch: (state,action)=>{
      state.listPostSearch = action.payload
    },
    setPagination:(state,action)=>{
      state.pagination = action.payload
    }
  }
})

const {reducer, actions} = Home;
export const {getListPost,getlistPostNew,getListPostHot,getListPostSearch,setPagination} = actions;
export default reducer;
