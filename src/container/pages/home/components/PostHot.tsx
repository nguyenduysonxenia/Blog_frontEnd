import PropTypes from 'prop-types'
import './PostHot.scss'
import {Link} from 'react-router-dom'
import {IMAGE_DEFAULT} from '../../../../service/api/constants'
import {RootState}  from '../../../../redux/app/store'
import {useSelector} from 'react-redux'
import Moment from 'react-moment';
function PostHot(props:any) {
  const posts: any = useSelector((state: RootState)=>state.HomePage.listPostHot)
  let results = posts.map((post:any,index: number)=>{
      return (
        <div key={index} className="col-lg-3 col-md-6 col-sm-12">
        <div className="card_item_post">
          <img className="card_item_post_image" src={ post.image.url_image ?   post.image.url_image :  IMAGE_DEFAULT } alt=""/>
          <div className="card_item_post-content">
            <h5><Link to={`/posts/${post._id}`}>{post.title}</Link> </h5>
            <div className="card_item_post-info">
              <time className="card_item_post-author" >
                <Moment format="D MMM YYYY" withTitle>
                    {post.createdAt}
                </Moment>
              </time>
              <span className="card_item_post-view">
                <i className="fas fa-eye"></i>
                <span className="card_item_post_view_number ">{post.views}</span>
                <span className="card_item_post_view_label">Views</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      )
  })
  return (
    <>
      {results}
    </>
  )
}
PostHot.propTypes = {

}
export default PostHot

