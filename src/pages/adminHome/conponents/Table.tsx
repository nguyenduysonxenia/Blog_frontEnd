import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import ButtonOtherPost from './ButtonOtherPost'
import postApi from '../../../api/PostAPI'
import {useDispatch} from 'react-redux'
import {setPost} from '../AdminHomeSlice'
import LoadingBG from '../../../components/Loading/LoadingBG'
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
      <tr key={index}>
          <th scope="row">{index +1}</th>
          <td id="content_post_td">{post.title}</td>
          <th>{post.views}</th>
          <td>{post.deleted ? 'Deleted' : 'Active'}</td>
          <td><ButtonOtherPost id={post._id} deleted ={post.deleted}  handleDeleteProps={handleDeletePost}/></td>
      </tr>
    )
  })
  return (
    <>
     {loading ? <LoadingBG/> : ''}
    <table className="table table-responsive table-block">
      <thead>
        <tr>
          <th>STT</th>
          <th>Title</th>
          <th>views</th>
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
