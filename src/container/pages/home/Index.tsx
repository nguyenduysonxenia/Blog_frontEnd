import React,{useState} from 'react'
import PropTypes from 'prop-types'
import PostHot from './components/PostHot';
import Banner from '../../../components/Banner/Banner';
import Search from '../../../components/Search/Search'
import ListPost from '../../../components/ListPost/ListPost'
import Pagination from '../../../components/Pagination/Pagination'
import SocialLink from '../../../components/SocialLink/Social'
import ListPostNew from '../../../components/ListPostNew/ListPostnew'
import Footer from '../../../components/Footer/Footer'
import BottomUp from '../../../components/BottomUp/BottomUp'
import {useDispatch, useSelector} from 'react-redux'
import postApi from '../../../service/api/PostAPI'
import {useEffect} from 'react'
import {getListPost,getlistPostNew,getListPostHot,setPagination} from './HomeSlice'
import LoadingBG from '../../../components/Loading/LoadingBG'
function Index(props: any) {
  const pagination: any = useSelector((state: any)=> state.HomePage.pagination);
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const handlePageChange = (newPage :any)=>{
    setPage(newPage)
  }
    const fetchPosts = async ()=>{
      const response: any = await postApi.getListPosts({page:page})
        .catch((err: any)=>{
            console.log(err)
        })
        const action = getListPost(response.result)
        dispatch(action)
        dispatch(setPagination({
          page: response.page,
          limit: response.limit,
          total: response.totalRow
        }))
    }
    const fetchPostsHot = async()=>{
        const response = await postApi.getPostsHot()
        .catch((err: any)=>{
            console.log(err)
        })
        const action = getListPostHot(response)
        dispatch(action)
    }
    const fetchPostNew = async()=>{
      const response = await postApi.getPostsNew()
        .catch((err: any)=>{
            console.log(err)
        })
        const action = getlistPostNew(response)
        dispatch(action)
        setLoading(false)
    }
    useEffect(() =>{
      fetchPosts()
      fetchPostsHot()
      fetchPostNew()
    },[page])

  return (
      <React.Fragment>
        {loading ? <LoadingBG/> : ''}
        <Banner/>
        <div className="container">
        <div className="row">
            <div className="col-lg-12">
              <div className="title_body">
                <h4>Popular Posts</h4>
                <p>Don't miss to check out our most popular posts</p>
              </div>
            </div>
        </div>
        <div className="row">
            <PostHot/>
        </div>
        <div className="row">
          <Search/>
        </div>
        <div className="row mt-4">
          <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="row">
            <ListPost/>
          </div>
          <div className="row">
            <div className="col-lg-12">
                <Pagination pagination={pagination} onPageChange={handlePageChange}/>
            </div>
          </div>
        </div>
          <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-12">
              <SocialLink/>
            </div>
            <ListPostNew/>
            </div>
        </div>
          </div>
      </div>
        <BottomUp/>
        <Footer/>
      </React.Fragment>
  )
}

Index.propTypes = {

}

export default Index
