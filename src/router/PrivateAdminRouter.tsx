import {Route,Redirect} from 'react-router-dom';
import React from 'react'
import {checkAdmin} from '../utils/Authen'

function PrivateAdminRouter({isAuth:isAuth, component: Component,...rest}: any){
  const routeComponent = (props: any) => (
            isAuth
            ? React.createElement(Component, props)
            :  <Redirect to="/" />
    );
  return <Route {...rest} render={routeComponent}/>
}
export default PrivateAdminRouter;