import {createSlice} from '@reduxjs/toolkit'

const ListPost = createSlice({
  name: 'ListPost',
  initialState: {
    listPost: [],
    pagination:{
      page: 1,
      limit: 6,
      totalPost: 10
    },
    search: ''
  },
  reducers:{
    setListPost: (state,action)=>{
      state.listPost = action.payload
    },
    setPanigation: (state,action)=>{
      state.pagination.page = action.payload
    },
    setKeySearch : (state,action)=>{
      state.search = action.payload
    },
    removePost: (state,action)=>{
      const index = state.listPost.findIndex((u:any)=> u._id.toString() === action.payload.toString())
      state.listPost.splice(index,1)
    }
  }
})

const {reducer, actions} = ListPost;
export const {setListPost,setPanigation,setKeySearch,removePost} = actions;
export default reducer;
