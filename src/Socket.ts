import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import {io} from 'socket.io-client'
toast.configure();
const SOCKET_URL_SERVER: any = process.env.REACT_APP_URL_SERVER
export const socket: any = io(SOCKET_URL_SERVER,
  {transports: ['websocket', 'polling', 'flashsocket']}
)
export const SocketContext = React.createContext(socket);
export const listenNotifycation = (socket:any)=>{
    socket.on('server-send-notification',function(data: any){
      let windows: any = window
      let currentUser =  windows.currentUser;
      let {post, authorComment, username} = data;
      if(currentUser.id && post.authors_id.toString() == currentUser.id.toString()
       && authorComment.toString() != currentUser.id.toString()){
         console.log('hahah')
         toast(` 🦄 ${username} Someone commented on your post`,{ position:"top-center", autoClose: 10000, })
      }
    })

}

export const emitNotifycation = (socket:any,data: any)=>{
  socket.emit('send-comment',data)
}
