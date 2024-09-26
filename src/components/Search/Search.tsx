import React,{useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './Search.scss'
import Searchsuggest from './Searchsuggest'
import {getListPostSearch} from '../../container/pages/home/HomeSlice'
import {useDispatch} from 'react-redux'
import postApi from '../../service/api/PostAPI'
function Search(props: any) {
  const dispatch = useDispatch();
  const [key,setKey] = useState('')
  const fetchPosts = async (params: string)=>{
    const response = await postApi.getListSearch(params)
      .catch((err: any)=>{
          console.log(err)
      })
      const action = getListPostSearch(response)
      dispatch(action)
  }
  const handleSearch = (e: any) =>{
      let query = e.target.value;
      fetchPosts(query)
      setKey(query)
  }
  return (
      <div className="col-lg-12">
        <div className="search_post">
          <div className="wrap_search">
            <input autoComplete={'false'} onChange={handleSearch} name="keysearch" type="text" placeholder="Search"  />
            <Searchsuggest/>
          </div>
          <Link to={`/posts/${key}`}>Search</Link>
        </div>

      </div>
  )
}

Search.propTypes = {

}

export default Search

