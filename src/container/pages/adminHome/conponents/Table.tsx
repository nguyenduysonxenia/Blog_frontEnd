import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import ButtonOtherPost from './ButtonOtherPost'
import postApi from '../../../../service/api/PostAPI'
import {useDispatch} from 'react-redux'
import {setPost} from '../AdminHomeSlice'
import LoadingBG from '../../../../components/Loading/LoadingBG'
function Table(props: any) {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const listPost = props.listPost;
  const handleDeletePost = async (idPost: any)=>{
    try {
      setLoading(true)
      let response: any  = await postApi.togleDeletePost(idPost);
      if(response){
       dispatch(setPost(response))
       setLoading(false)
       toast.success(` 🦄  Updated Post successfully`,{ position:"top-center" })
      }
    } catch (error) {
       console.log(error)
    }
  }
  let renderList = listPost.map((post: any,index: number)=>{
    return (
      <tr className="title_row_admin" key={index}>
          <td scope="row">{index +1}</td>
          <td id="content_post_td">{post.title}</td>
          <td>{post.views}</td>
          <td>{post.comments.length}</td>
          <td>{post.likes.length}</td>
          <td ><span className={`content_activate ${post.deleted ? 'content_activate_false' : 'content_activate_true'}`}>{post.deleted ? 'Deleted' : 'Active'}</span></td>
          <td><ButtonOtherPost id={post._id} deleted ={post.deleted}  handleDeleteProps={handleDeletePost}/></td>
      </tr>
    )
  })
  return (
    <>
     {loading ? <LoadingBG/> : ''}
    <table className="table table-responsive table-block">
      <thead>
        <tr className="title_table_admin">
          <th>STT</th>
          <th>Title</th>
          <th>Views</th>
          <th>Comment</th>
          <th>Like</th>
          <th>Status</th>
          <th>Other</th>
        </tr>
      </thead>
      <tbody>
        {renderList}
      </tbody>
    </table>
    </>
  );
}

Table.propTypes = {
  listPost : PropTypes.array
};

export default Table;
