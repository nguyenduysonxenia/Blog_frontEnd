import React from 'react';
import PropTypes from 'prop-types';
import FormEditPassword from './conponents/editPassword'
import userApi from '../../../service/api/UserAPI'
import { toast } from 'react-toastify';
function index(props: any) {

  const handelSumbit = async (body: any) =>{
    try {
      let response = await userApi.uploadPassword(body);
    if(response){
      toast.success(` 🦄 Update successfully!`,{ position:"top-center" })
    }
    } catch (error: any) {
      toast.error(` 🦄 ${error.response.data}!`,{ position:"top-center" })
    }
  }
  return (
    <>
      <div className="title_profile">
        <div className="title_add_post_wrap">
              <h1 className="title_add_post">Update Passwod</h1>
          </div>
      </div>
      <div className="page-wrapper">
        <div className="container">
           <FormEditPassword handelProps={handelSumbit} />
        </div>
      </div>
    </>
  );
}

index.propTypes = {};

export default index;
