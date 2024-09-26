import {createSlice} from '@reduxjs/toolkit'

const EditPostSlice = createSlice({
  name: 'editPost',
  initialState: {
    Post: null,
  },
  reducers:{
    setPost: (state,action)=>{
      state.Post = action.payload
    },

  }
})

const {reducer, actions} = EditPostSlice;
export const {setPost} = actions;
export default reducer;
