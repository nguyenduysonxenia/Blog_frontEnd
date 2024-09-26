import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss';
import SubComment from './SubComment'
import Moment from 'react-moment';
import FormPostComment from './FormPostComment'
import { useSelector } from 'react-redux';
function Comment(props: any) {
  const comments = useSelector((state: any)=> state.DetailPostPage.comments)
  const post: any = useSelector((state: any)=> state.DetailPostPage.Post)
  let results = comments.map((comment: any,index: number)=>{
    return (
        <div key={index} className="media mt-4">
          {' '}
          <img
            className="mr-3 rounded-circle"
            src={comment.authorInfo.avatar ? comment.authorInfo.avatar.url_image : '/images/userDefault.png'}
          />
          <div className="media-body">
            <div className="row">
              <div className="col-8 d-flex">
                <h5 className="comment_author_name">{comment.authorInfo.name}</h5>
                <span className="comment_time">
                  <Moment format="D MMM YYYY" withTitle>
                    {comment.createdAt}
                  </Moment>
              </span>
              </div>
            </div>
            <span className="content_comment">
              {comment.content}
            </span>
            <FormPostComment postId={post._id} parentComment={comment._id}/>
            <SubComment comment={comment.subComments}/>
          </div>
        </div>
    )
  })
  return (
    <>
      {results}
    </>

  );
}

Comment.propTypes = {
  handleComment: PropTypes.func
};

export default Comment;
