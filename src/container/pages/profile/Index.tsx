import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './Profile.scss';
import {useSelector,useDispatch} from 'react-redux'
import FormProfile from './components/FormProfile'
import LoadingBG from '../../../components/Loading/LoadingBG'
import userApi from '../../../service/api/UserAPI'
import { toast } from 'react-toastify';
import {setCurrentUser} from '../user/UserSlice'
function Index(props: any) {
  const [loading,setLoading] = useState(false);
  const disPatch = useDispatch();
  const currentUser = useSelector((state: any)=> state.CurrentUser);
  const handelSumbit = async (body: any) =>{
    try {
      let formData = new FormData();
     formData.append('username',body.username)
     formData.append('avatar',body.avatar)
    setLoading(true)
    let response: any = await userApi.uploadProfile(formData);
    if(response){
      setLoading(false)
      disPatch(setCurrentUser({
        username: response.username,
        id:response.id,
        avatar: response.avatar
      }))
      window.location.href = '/profile'
    }
    } catch (error: any) {
      toast.error(` 🦄 ${error.response.data} `,{ position:"top-center" })
    }
  }
  useEffect(()=>{
    disPatch(setCurrentUser(currentUser))
  },[currentUser])
  return (
    <>
    {loading ? <LoadingBG/> : ''}
      <div className="title_profile">
        <div className="title_add_post_wrap">
              <h1 className="title_add_post">Upload profile</h1>
          </div>
      </div>
      <div className="page-wrapper">
        <div className="container">
          {currentUser.id &&  <FormProfile data={currentUser} handelProps={handelSumbit} /> }
        </div>
      </div>
    </>
  );
}

Index.propTypes = {};

export default Index;
