import React from 'react';
import PropTypes from 'prop-types';
import './Comment.scss'
import Moment from 'react-moment';
function SubComment(props: any) {
  const comments = props.comment;
  let results = comments.map((comment:any,index: number)=>{
    return (
      <div key={index} className="media mt-4">
      {' '}
      <a className="pr-3" href="#">
        <img
          className="rounded-circle"
          alt="Bootstrap Media Another Preview"
          src={comment.authorInfo.avatar ? comment.authorInfo.avatar.url_image : 'images/userDefault.png'}
        />
      </a>
      <div className="media-body">
        <div className="row">
          <div className="col-12 d-flex">
            <h5 className="comment_author_name">{comment.authorInfo.name}</h5> <span className="comment_time"><Moment format="D MMM YYYY" withTitle>
                    {comment.createdAt}
                  </Moment></span>
          </div>
        </div>
        <span className="content_comment"> {comment.content}</span>
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

SubComment.propTypes = {
  comment: PropTypes.array
};

export default SubComment;
