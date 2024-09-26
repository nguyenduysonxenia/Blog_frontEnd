import React from 'react';
import PropTypes from 'prop-types';
import postApi from '../../service/api/PostAPI'
import ButtonRemove from './ButtonRemove'
import './Table.scss';
import {Link} from 'react-router-dom'
import Pagination from '../Pagination/PaginationVip'
import { useSelector,useDispatch } from 'react-redux';
import {setPanigation,setListPost} from '../../container/pages/listPost/ListPostSlice'
function Table(props: any) {
  const listPosts  = useSelector((state: any)=>state.ListPostPage.listPost)
  const pagination = useSelector((state: any)=>state.ListPostPage.pagination)
  const disPatch = useDispatch();
  const handlePageChange = (newPage: any)=>{
    disPatch(setPanigation(newPage))
  }
  const handleSearchPost = (e: any)=>{
    const getListPostSearch = async ()=>{
      try {
        let key = e.target.value
        const response = await postApi.getListSearchofUser(key);
        if(response){
          disPatch(setListPost(response))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getListPostSearch()
  }
  const result = props.listPost.map((post: any,index: number)=>{
    return (
      <tr key={index} >
              <th scope="row">{index +1}</th>
              <td ><p id="content_post_td">{post.title}</p></td>
              <td>{post.views}</td>
              <td>{post.likes.length}</td>
              <td>{post.comments.length}</td>
              <td>{post.actived ? 'activated': 'not activated'}</td>
              <td>{new Intl.DateTimeFormat('en-US').format(new Date(post.createdAt))}</td>
              <td><Link to={`/posts/${post._id}/edit`} className="btn btn-warning"><i className="far fa-edit"></i></Link></td>
              <td><ButtonRemove idPost={post._id} /></td>
            </tr>
    )
  })
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <h2 className="pt-3 pb-4 text-center font-bold font-up deep-purple-text">
              Search Post
            </h2>
            <div className="input-group md-form form-sm form-2 pl-0">
              <input
                onChange={handleSearchPost}
                className="form-control my-0 py-1 pl-3 purple-border"
                type="text"
                placeholder="Search something here..."
                aria-label="Search"
              />
              <span
                className="input-group-addon waves-effect purple lighten-2 input_search_post_icon "
                id="basic-addon1"
              >
                <a>
                  <i className="fa fa-search white-text" aria-hidden="true"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
        <table className="table table-hover table-responsive-lg mb-0">
          <thead>
            <tr>
              <th scope="row">STT</th>
              <th className="th-lg title-table">
                <a>Title</a>
              </th>
              <th className="th-lg title-table">
                <a href="">View</a>
              </th>
              <th className="th-lg title-table">
                <a href="">Like</a>
              </th>
              <th className="th-lg title-table">
                <a href="">Comment</a>
              </th>
              <th className="th-lg title-table">
                <a href="">Status</a>
              </th>
              <th  className="th-lg title-table">
                <a href="">createdAt</a>
              </th>
              <th colSpan={2} className="th-lg title-table">
                <a href="">createdAt</a>
              </th>
            </tr>
          </thead>

          <tbody>
              {result}
          </tbody>
        </table>
        <Pagination pagination={pagination} onPageChange={handlePageChange}/>
        </div>
    </div>
  );
}

Table.propTypes = {
  listPost: PropTypes.array,
  pagination: PropTypes.object
};

export default Table;
