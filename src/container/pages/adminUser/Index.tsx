import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../adminHome/conponents/Sidebar'
import Table from './components/Table'
import Pagination from '../../../components/Pagination/Pagination'
import { useSelector,useDispatch } from 'react-redux';
import userApi from '../../../service/api/UserAPI'
import LoadingBG from '../../../components/Loading/LoadingBG'
import {setListUser,setPagination} from './AdminUserSlice'
function Index(props: any) {
  const [loading,setLoading] = useState(true);
  const disPatch = useDispatch();
  const [page,setPage] = useState(1);
  const pagination: any = useSelector((state: any)=> state.AdminUserSlice.pagination);
  const listUser = useSelector((state: any)=> state.AdminUserSlice.listUser);
  function handlePageChange(newPage: any){
    setPage(newPage)
  }
  const getListUserAdmin = async()=>{
      try {
           let response: any = await userApi.getListUser(page)
           let pagination = {
             page: response.page,
             limit: response.limit,
             total: response.totalRow,
           }
           disPatch(setPagination(pagination))
           disPatch(setListUser(response.result))
           setLoading(false);
      } catch (error: any) {
         console.log(error)
      }
  }
  useEffect(()=>{
    getListUserAdmin()
  },[page])
  return (
    <>
    {loading ? <LoadingBG/> : ''}
    <div className="container-fluid w-85">
      <div className="row">
        <div className="col-lg-12">
           <h2 className="title_dashboard">List User</h2>
        </div>
      </div>
      <Sidebar/>
      <div className="main bg-color-white">
        <div className="row">
          <div className="col-lg-12">
            <Table listUser={listUser} />
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
