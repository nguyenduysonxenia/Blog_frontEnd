import React from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import postApi from '../../service/api/PostAPI'
import {useDispatch } from 'react-redux';
import {removePost} from '../../container/pages/listPost/ListPostSlice'
function ButtonRemove(props: any) {
  const disPatch = useDispatch();
  const deletedPost  = async ()=>{
     try {
       let response  = await postApi.deletedPost(props.idPost);
       if(response){
        disPatch(removePost(props.idPost))
        toast.success(` 🦄  Post deleted successfully`,{ position:"top-center", autoClose: 10000, })
       }

     } catch (error) {
        console.log(error)
     }
  }
  const handleDeletePost = (e: any)=>{
    confirmAlert({
      title: 'Alert',
      message: 'Do you really want to delete?.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deletedPost()

          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }
  return (
    <button onClick={handleDeletePost} type="button" className="btn btn-danger">
      <i className="far fa-trash-alt"></i>
    </button>
  );
}

ButtonRemove.propTypes = {
  idPost: PropTypes.string
};

export default ButtonRemove;
