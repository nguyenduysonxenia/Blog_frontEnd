

import  jwt from 'jsonwebtoken'
const screct:any = process.env.REACT_APP_SCRECT
export const checkLogin = ()=>{
  let authenToken: any = localStorage.getItem('authenToken')
  if(!authenToken)
     return false;
   try {
     let results: any = jwt.verify(authenToken, screct)
     if(results)
        return results.isLogin
   } catch (error) {
    return false;
   }
}

export const setToken = (role:any)=>{
  const token = jwt.sign({ isLogin: true }, screct);
  localStorage.setItem('authenToken',token);
  const roletoken = jwt.sign({ admin: role }, screct);
  localStorage.setItem('roleToken',roletoken)
}
export const removeToken = ()=>{
  localStorage.removeItem('accessToken')
  localStorage.removeItem('authenToken')
  localStorage.removeItem('roleToken')
}
export const checkToken = ()=>{
  const token = localStorage.getItem('accessToken')
  if(token)
     return true;
  return false;
}
export const checkAdmin = ()=>{
  const token: any = localStorage.getItem('roleToken')
  if(!token)
    return false;
  try {
    let results: any = jwt.verify(token, screct)
    if(results)
       return results.admin
  } catch (error) {
   return false;
  }
}