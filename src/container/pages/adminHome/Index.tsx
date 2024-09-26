import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import './AdminHome.scss';
import Sidebar from './conponents/Sidebar'
import ItemCard from './conponents/ItemCard'
import Table from './conponents/Table'
import Pagination from '../../../components/Pagination/Pagination'
import { useSelector,useDispatch } from 'react-redux';
import postApi from '../../../service/api/PostAPI'
import {setListPost,setPagination,setView} from './AdminHomeSlice'
import LoadingBG from '../../../components/Loading/LoadingBG'
function Index(props: any) {
  const [loading,setLoading] = useState(true);
  const disPatch = useDispatch();
  const [page,setPage] = useState(1);
  const pagination: any = useSelector((state: any)=> state.AdminHomeSlice.pagination);
  const listPost = useSelector((state: any)=> state.AdminHomeSlice.listPost);
  const views = useSelector((state: any)=> state.AdminHomeSlice.views);
  function handlePageChange(newPage: any){
    setPage(newPage)
    setLoading(true)

  }
  const getListPostAdmin = async()=>{
      try {
           let response: any = await postApi.getListPostOfAdmin({page})
           let pagination = {
             page: response.page,
             limit: response.limit,
             total: response.totalRow,
           }
           disPatch(setPagination(pagination))
           disPatch(setListPost(response.result))
      } catch (error: any) {
         console.log(error)
      }
  }
  const getViewAdmin = async()=>{
    try {
      let response: any = await postApi.getView()
      disPatch(setView(response))
      } catch (error: any) {
          console.log(error)
      }
  }
  useEffect(()=>{
    getListPostAdmin()
    getViewAdmin()
    setLoading(false)
  },[page])
  return (
    <>
    {loading ? <LoadingBG/> : ''}
    <div className="container-fluid w-85">
      <div className="row">
        <div className="col-lg-12">
           <h2 className="title_dashboard">Overview</h2>
        </div>
      </div>
      <Sidebar/>
      <div className="main bg-color-white">
        <div className="row">
          <ItemCard views={views}/>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Table listPost={listPost} />
            <Pagination onPageChange ={handlePageChange} pagination = {pagination} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

Index.propTypes = {};

export default Index;
