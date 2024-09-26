import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {  toast } from 'react-toastify';
import ButtonOtherUser from '../../adminHome/conponents/ButtonOtherPost'
import {useDispatch} from 'react-redux'
import LoadingBG from '../../../../components/Loading/LoadingBG'
import userApi from '../../../../service/api/UserAPI'
import {setUser} from '../AdminUserSlice'
function Table(props: any) {
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const listUser = props.listUser;
  const handleDeleteUser = async (idUser: any)=>{
    setLoading(true)
    let response = await userApi.toggleUser(idUser)
    dispatch(setUser(response))
    setLoading(false)
    toast.success(` 🦄  Updated User successfully`,{ position:"top-center" })
  }
  let renderList = listUser.map((user: any,index: number)=>{
    return (
      <tr className="title_row_admin" key={index}>
          <td scope="row">{index +1}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td><span className={`content_activate ${user.activate ? 'content_activate_true' : 'content_activate_pending'}`}>{user.activate ? 'activate' : 'pending'}</span></td>
          <td><span className={`content_activate ${user.deleted ? 'content_activate_false' : 'content_activate_true'}`} >{user.deleted ? 'yes' : 'no'}</span></td>
          <td><ButtonOtherUser id={user._id} deleted ={user.deleted}  handleDeleteProps={handleDeleteUser}/></td>
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
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Block</th>
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
  listUser : PropTypes.array
};

export default Table;
