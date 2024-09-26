import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState}  from '../../redux/app/store'
function Searchsuggest(props: any) {
  const posts: any = useSelector((state: RootState)=>state.HomePage.listPostSearch)
  var results = posts.map((post: any, index: number)=>{
    return (
      <li key={index} ><Link to={`/posts/${post._id}`}>{post.title}</Link></li>
    )
  })
  return (
    results.length > 0 ?
    <ul className="wrap_list_search">
      {results}
    </ul>
    :
    null
  )
}

Searchsuggest.propTypes = {

}

export default Searchsuggest

