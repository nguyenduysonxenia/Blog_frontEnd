import React from 'react'
import PropTypes from 'prop-types'
import './PostChild.scss'
import {Link} from 'react-router-dom'
import {IMAGE_DEFAULT} from '../../service/api/constants'
import Moment from 'react-moment';
import {RootState}  from '../../redux/app/store'
import {useSelector} from 'react-redux'
function PostChild(props: any) {
  const posts: any = useSelector((state: RootState)=>state.HomePage.listPostNew)
  let results = posts.map((post: any, index: number)=>{
    return (
      <div key={index} className="post_item_child">
        <img src={ post.image.url_image ?   post.image.url_image :  IMAGE_DEFAULT } alt="" width="80" height="80"/>
        <div className="post_item_child-content">
          <h5> <Link to={`/posts/${post._id}`}>{post.title}</Link> </h5>
          <time className="detail_post-author" >
            <Moment format="D MMM YYYY" withTitle>
              {post.createdAt}
            </Moment>
          </time>
        </div>
      </div>
    );
  })
  return (
    <>
      {results}
    </>
  )
}

PostChild.propTypes = {

}

export default PostChild

