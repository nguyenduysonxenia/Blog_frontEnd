import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import Table from '../../../components/Table/Table'
import postApi from '../../../service/api/PostAPI'
import {setListPost} from './ListPostSlice'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import LoadingBG from '../../../components/Loading/LoadingBG'
function Index(props: any) {
  const [loading,setLoading] = useState(true)
  const listPost = useSelector((state: any)=>state.ListPostPage.listPost)
  const dispatch = useDispatch();
  const Pagination: any  = useSelector((state: any)=>state.ListPostPage.pagination)
  const getListPost = async()=>{
     let response: any = await postApi.getListPostsOfUser({page:Pagination.page, limit: Pagination.limit});
     dispatch(setListPost(response.results))
     setLoading(false)
  }
  useEffect(()=>{
    getListPost()
  },[Pagination])
  return (
    <>
    {loading ? <LoadingBG/> : ''}
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
        <div className="title_add_post_wrap">
              <h1 className="title_add_post">List Post</h1>
          </div>
        </div>
        <div className="col-lg-12">
          <Link to="/posts/new" type="button" className="btn btn-primary link_move_add_post">Add Post</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Table listPost={listPost} />
        </div>
      </div>
    </div>
  </>
  )
}

Index.propTypes = {

}

export default Index

