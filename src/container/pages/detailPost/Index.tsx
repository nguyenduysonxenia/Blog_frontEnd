import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SocialLink from '../../../components/SocialLink/Social';
import ListPostNew from '../../../components/ListPostNew/ListPostnew';
import Footer from '../../../components/Footer/Footer';
import Post from './components/Post';
import OtherPost from './components/OtherPost';
import ListComment from './components/ListComment';
import { useDispatch, useSelector } from 'react-redux';
import postApi from '../../../service/api/PostAPI';
import LoadingBG from '../../../components/Loading/LoadingBG'
import {
  getPost,
  getComments,
  toggleLike,
  setCountView,
  setCountLike,
} from './DetailPpstSlice';

interface Params {
  postId: string;
}
function Index(props: any) {
  const [loading,setLoading] = useState(true)
  const showComment = useSelector(
    (state: any) => state.DetailPostPage.showComment,
  );
  const currentUser = useSelector((state: any) => state.CurrentUser);
  const dispatch = useDispatch();
  const history = props.history;
  const params: Params = useParams();
  const fetchPost = async () => {
    const response: any = await postApi.getPost(params.postId).catch((err) => {
      history.replace('/notfound');
    });
    if (response) {
      const comments = await postApi.getComments(response._id);
      const actionPost = getPost(response);
      const actionComment = getComments(comments);
      const actionView = setCountView(response.views);
      const actioncountLike = setCountLike(response.likes.length);
      dispatch(actionPost);
      dispatch(actionComment);
      dispatch(actionView);
      dispatch(actioncountLike);
      var isExist = -1;
      if (currentUser.id) {
        isExist = response.likes.findIndex(
          (u: any) => u.toString() === currentUser.id.toString(),
        );
      }
      let isLike = isExist == -1 ? false : true;
      const actionLike = toggleLike(isLike);
      dispatch(actionLike);
      setLoading(false)
    }
  };
  const fetchViews = async () => {
    try{
      const response: any = await postApi.view(params.postId)
    }catch(err: any){
      console.log(err)
    }
  };
  useEffect(() => {
    fetchPost();
    fetchViews();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [params,currentUser]);
  return (
    <div>
      <React.Fragment>
        {loading ? <LoadingBG/> : ''}
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-12">
                  <Post />
                </div>
                <div className="col-lg-12">
                  <OtherPost />
                </div>
              </div>
              {showComment && (
                <div className="row">
                  <ListComment />
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <SocialLink />
                </div>
                <ListPostNew />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </div>
  );
}

Index.propTypes = {};

export default Index;

