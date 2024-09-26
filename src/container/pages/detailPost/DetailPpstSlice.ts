import {createSlice} from '@reduxjs/toolkit'

const Home = createSlice({
  name: 'detailPage',
  initialState: {
    Post: null,
    comments: [],
    author:[],
    showComment: false,
    curentUser:{},
    islike: null,
    countViews: null,
    countLikes: null,
  },
  reducers:{
    getPost: (state,action)=>{
      state.Post = action.payload
    },
    getComments: (state,action)=>{
      state.comments = action.payload
    },
    toggleComment: (state,action)=>{
      state.showComment = !state.showComment
    },
    toggleLike: (state,action)=>{
      state.islike = action.payload
    },
    setCountView: (state,action)=>{
      state.countViews = action.payload
    },
    setCountLike: (state,action)=>{
      state.countLikes = action.payload
    },
    postComment: (state,action)=>{
      state.comments = [...(state.comments)].concat(action.payload)
    },
    postSubComment: (state,action)=>{
       let comments: Array<any> = state.comments;
       let index:number = comments.findIndex((u:any)=> u._id.toString() == action.payload.parentComment.toString())
       comments[index].subComments = [...(comments[index].subComments)].concat(action.payload)
    },
  }
})

const {reducer, actions} = Home;
export const {getPost,getComments,toggleComment,toggleLike,setCountView,setCountLike,postComment,postSubComment} = actions;
export default reducer;
