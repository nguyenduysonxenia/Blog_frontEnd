import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch,useSelector} from 'react-redux'
import './OtherPost.scss'
import {useHistory} from 'react-router-dom'
import {toggleComment,toggleLike,setCountView,setCountLike} from '../DetailPpstSlice'
import postApi from '../../../../service/api/PostAPI';
function OtherPost(props: any) {
  const history  = useHistory();
  let currentUser = useSelector((state: any)=> state.CurrentUser);
  const {islike,Post,countViews,countLikes} = useSelector((state: any)=> state.DetailPostPage)
  const disPatch = useDispatch();
  const handleComment = ()=>{
    const action  = toggleComment('');
    disPatch(action)
  }
  const handleLike = async ()=>{
    if(!currentUser.id){
      return history.replace('/signin')
    }
    try {
      const response: any  = await postApi.like(Post._id)
      let isExist = response.likes.findIndex((u:string)=>u.toString() == currentUser.id.toString())
      let islike = isExist != -1 ? true : false

      const action = toggleLike(islike);
      const actionView = setCountView(response.views);
      const actioncountLike = setCountLike(response.likes.length);
      disPatch(action);
      disPatch(actionView);
      disPatch(actioncountLike);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    Post ?
    <div  className="post-info-other">
      <div onClick={handleComment} className="post-info-other-comment">
        <i className="far fa-comment"></i>
        <span> {Post.comments.length} </span>
      </div>
      <div className="post-info-other-view">
        <i className="far fa-eye"></i>
        <span>{countViews}</span>
      </div>
      <div onClick={handleLike} className={`post-info-other-like ${islike ? 'active_like' : ''}`}>
      <i className="far fa-thumbs-up"></i>
        <span>{countLikes}</span>
      </div>
    </div>
    :
    null
  );
}

OtherPost.propTypes = {};

export default OtherPost;
