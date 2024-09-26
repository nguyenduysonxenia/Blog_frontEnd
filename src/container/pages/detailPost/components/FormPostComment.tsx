import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import './FormPostComment.scss';
import { useFormik } from 'formik';
import {useDispatch,useSelector} from 'react-redux'
import {postComment,postSubComment} from '../DetailPpstSlice'
import postApi from '../../../../service/api/PostAPI'
import { useHistory } from 'react-router-dom';
import {emitNotifycation} from '../../../../Socket'
import {SocketContext} from '../../../../Socket'
function FormPostComment(props: any) {
  const socket = React.useContext(SocketContext);
  const history = useHistory();
  const currentUser = useSelector((state: any)=> state.CurrentUser);
  const distPatch = useDispatch();
  const {postId,parentComment} = props;
  const clientSend = useCallback((data: any)=>{
    emitNotifycation(socket,data)
  },[])
  const addComment = async (data: any)=>{
    const response: any = await postApi.postComment(postId,data)
    .catch((error)=>{
      console.log(error);
    })
    let body = {...response,authorInfo:{
      name: currentUser.username,
      avatar: currentUser.avatar
    },subComments:[]}
    if(response.parentComment){
      const action = postSubComment(body)
      distPatch(action)
    }
    else{
      const action = postComment(body)
      distPatch(action)
    }
    clientSend({postId,authorComment: response.author,username:currentUser.username});
  }
  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values,{ resetForm }) => {
      if(currentUser.username){
        addComment({parentComment,...values});
        resetForm()
      }
      else{
        history.replace('/signin')
      }
    },
  });
  return (
    <form id="form_post_Comment" onSubmit={formik.handleSubmit} >
      <input className='input_post_Comment'
       placeholder="comment..."
       type="text"
       name="content"
       value={formik.values.content}
       onChange={formik.handleChange}
       />
      <button className='btn_submit_comment' type="submit"><i className="fas fa-paper-plane"></i></button>
    </form>
  )
}

FormPostComment.propTypes = {
  postId: PropTypes.string,
  parentComment: PropTypes.any,
}

export default FormPostComment

