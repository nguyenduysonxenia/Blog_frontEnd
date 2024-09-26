import React from 'react'
import PropTypes from 'prop-types'
import './Post.scss'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Moment from 'react-moment';
function Post(props: any) {
  const post = useSelector((state: any)=> state.DetailPostPage.Post);
  function createMarkup(data: string) {
    return {__html: data};
  }
  return (
    post ?
    <div className="post_deltail">
      <div className="post_deltail-wrap">
        <img className="post_deltail-wrap-image" src={post.image ? post.image.url_image : '/images/hinh3.jpg'}/>
      </div>
      <div className="post_deltail-content">
        <h2 className="post_deltail-content-tile">
          {post.title}
        </h2>
        <div className="post_deltail-content-author">
            <span className="post_deltail-content-author-name">
              By <Link to='#'>{post.author.username}</Link>
            </span>
            <span className="post_deltail-content-author-date">
              <Moment format="D MMM YYYY" withTitle>
                    {post.createdAt}
              </Moment>
            </span>
            <span className="post_deltail-content-author-minute">
            <Moment toNow>{post.createdAt}</Moment>
            </span>
        </div>
        <div className="post_deltail-content-text" dangerouslySetInnerHTML={createMarkup(post.content)}>
        </div>
      </div>
    </div>
    : null
  )
}

Post.propTypes = {

}

export default Post

