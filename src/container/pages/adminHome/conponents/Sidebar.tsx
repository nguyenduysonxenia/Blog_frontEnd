import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
function Sidebar(props: any) {
  return (
    <div className="sidebar-admin">
        <ul>
          <li>
            <Link to="/admin">
              <i className="fa fa-desktop"></i>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <i className="fas fa-users"></i>
              <span>User management</span>
            </Link>
          </li>

          <li>
            <Link to="/admin/statistical">
              <i className="fa fa-table"></i>
              <span>Statistical</span>
            </Link>
          </li>
        </ul>
      </div>
  )
}

Sidebar.propTypes = {

}

export default Sidebar

