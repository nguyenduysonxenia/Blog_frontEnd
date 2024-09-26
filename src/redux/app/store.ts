
import {configureStore} from '@reduxjs/toolkit'
import HomeSlice from '../../container/pages/home/HomeSlice'
import DetailPostSlice from '../../container/pages/detailPost/DetailPpstSlice'
import UserSlice from '../../container/pages/user/UserSlice'
import ListPostSlice from '../../container/pages/listPost/ListPostSlice'
import EditPostSlice from '../../container/pages/editPost/EditPostSlice'
import AdminHomeSlice from '../../container/pages/adminHome/AdminHomeSlice'
import AdminUserSlice from '../../container/pages/adminUser/AdminUserSlice'
const rootReducer = {
  HomePage: HomeSlice,
  DetailPostPage: DetailPostSlice,
  CurrentUser: UserSlice,
  ListPostPage: ListPostSlice,
  EditPostPage: EditPostSlice,
  AdminHomeSlice: AdminHomeSlice,
  AdminUserSlice:AdminUserSlice
}
const store = configureStore({
  reducer:rootReducer
})
export type RootState = ReturnType<typeof store.getState>
export default store