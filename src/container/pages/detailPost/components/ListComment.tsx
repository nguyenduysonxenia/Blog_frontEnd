import React from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import {useSelector} from 'react-redux'
import FormPostComment from './FormPostComment'
function ListComment(props: any) {
  const post: any = useSelector((state: any)=> state.DetailPostPage.Post)
  return (
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12">
            <Comment/>
            <FormPostComment postId={post._id} parentComment={null}/>
        </div>
      </div>
    </div>
  )
}

ListComment.propTypes = {

}

export default ListComment

