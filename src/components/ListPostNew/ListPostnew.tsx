import React from 'react';
import PropTypes from 'prop-types';
import './ListPostNew.scss';
import {IMAGE_DEFAULT} from '../../service/api/constants'
import {Link} from 'react-router-dom'
import {RootState}  from '../../redux/app/store'
import {useSelector} from 'react-redux'
import Moment from 'react-moment';
function ListPostnew(props: any) {
  const posts: any = useSelector((state: RootState)=>state.HomePage.listPostNew)
  let results = posts.map((post: any,index: number)=>{
      return (
        <div key={index} className="post_item_child">
          <img src={ post.image.url_image ?  post.image.url_image : IMAGE_DEFAULT} alt="" width="80" height="80" />
          <div className="post_item_child-content">
            <h5 className="recent_post_title">
              {' '}
              <Link to={`/posts/${post._id}`}>{post.title}</Link>{' '}
            </h5>
            <time className="detail_post-author recent_post_time">
              <Moment format="D MMM YYYY" withTitle>
                    {post.createdAt}
              </Moment>
            </time>
          </div>
        </div>
      );
  })
  return (
    <div className="col-lg-12">
      <div className="baner_content-listpost baner_content-listpost_recent ">
        <h4>New Post</h4>
          {results}
      </div>
    </div>
  );
}

ListPostnew.propTypes = {};

export default ListPostnew;
