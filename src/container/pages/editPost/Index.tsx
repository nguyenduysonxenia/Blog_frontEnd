import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import '../addPost/Post.scss'
import {useDispatch,useSelector} from 'react-redux'
import postApi from '../../../service/api/PostAPI'
import FormEditPost from '../../../components/FormPost/FormEdit'
import Toast from '../../../utils/Toast'
import Loading from '../../../components/Loading/Loading'
import {useParams} from 'react-router-dom'
import {setPost} from './EditPostSlice'
interface Params {
  postId: string;
}
function Index(props : any) {
  const disPatch = useDispatch();
  const post  = useSelector((state: any)=>state.EditPostPage.Post)
  const params: Params = useParams();
  const [loading,setLoading] = useState(true);
  const getPost =  async() =>{
    try {
      let response = await postApi.getPost(params.postId)
      if(response){
        disPatch(setPost(response))
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (body: any)=>{
     setLoading(true)
     let formData = new FormData();
     formData.append('title',body.title)
     formData.append('content',body.content)
     formData.append('image',body.image)
      try {
        let response = await postApi.editPost(formData,body.postId)
        if(response){
          setLoading(false)
          Toast('Edit successfully')
          disPatch(setPost(null))
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    getPost()
  },[params,post])
  return (
    <>
    {loading && <Loading/>}
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title_add_post_wrap">
              <h1 className="title_add_post">Edit Post</h1>
          </div>
        </div>
      </div>
       {post && <FormEditPost handleSubmit={handleSubmit}  />}

    </div>
    </>
  )
}

Index.propTypes = {

}

export default Index

