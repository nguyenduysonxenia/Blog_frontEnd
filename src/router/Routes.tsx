import React from 'react'
import PropTypes from 'prop-types'
import {SocketContext, socket } from "../Socket";
import Home from '../container/pages/home/Index';
import Header from '../components/Header/Header';
import DetailPost from '../container/pages/detailPost/Index'
import Signup from '../components/Signup/Signup'
import Signin from '../components/Signin/Signin'
import AddPost from '../container/pages/addPost/Index'
import ListPost from '../container/pages/listPost/Index'
import EditPost from '../container/pages/editPost/Index'
import PrivateRoute from './PrivateRouter'
import PrivateAdminRoute from './PrivateAdminRouter'
import Profile from '../container/pages/profile/Index'
import EditPassword from '../container/pages/editPassword/index'
import AdminHome from '../container/pages/adminHome/Index'
import NotFound from '../components/Notfound/NotFound'
import AdminUser from '../container/pages/adminUser/Index'
import FormReset from '../container/pages/ResetPassword/Index'
import FormForgot from '../container/pages/ResetPassword/components/FormSendEmail'
import {checkShowHeader} from "../utils/CheckShow";
import {useLocation} from 'react-router-dom'
import {checkAdmin,checkLogin} from '../utils/Authen'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
function Routes(props: any) {
  const pathname: any = useLocation().pathname;
  const isLogin = checkLogin();
  const isAdim = checkAdmin();
  return (
     <SocketContext.Provider value={socket}>
         {checkShowHeader(pathname) && <Header/>}
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute isAuth={isLogin} path="/posts/new"  component={AddPost} />
          <PrivateRoute isAuth={isLogin} path="/posts/:postId/edit" exact component={EditPost} />
          <Route path="/posts/:postId" exact component={DetailPost} />
          <PrivateRoute isAuth={isLogin} path="/posts"  component={ListPost} />
          <PrivateRoute isAuth={isLogin} path="/profile"  component={Profile} />
          <PrivateRoute isAuth={isLogin} path="/editPassword"  component={EditPassword}   />
          <Route path="/forgot" component={FormForgot} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/forgotPassword/:token" component={FormReset} />
          <PrivateAdminRoute isAuth={isAdim} path="/admin/users"  component={AdminUser} />
          <PrivateAdminRoute isAuth={isAdim} path="/admin" component={AdminHome} />
          <Route path='*' exact component={NotFound} />
        </Switch>
     </SocketContext.Provider>
  )
}

Routes.propTypes = {

}

export default withRouter(Routes)

