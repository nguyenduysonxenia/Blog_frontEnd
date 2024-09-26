import {Route,Redirect} from 'react-router-dom';
import React from 'react'
import {checkLogin} from '../utils/Authen'
function PrivateRoute({isAuth: isAuth, component: Component,...rest}: any){
  const routeComponent = (props: any) => (
            isAuth
            ? React.createElement(Component, props)
            :  <Redirect to="/signin" />
    );
  return <Route {...rest} render={routeComponent}/>
}


export default PrivateRoute;