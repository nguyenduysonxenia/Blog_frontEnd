import asxiosClient from './AxiosClient'
interface Post{
  title: string,
  content:string,
  image:string,
}

const postApi = {
  getListPosts: (params?: any) =>{
    let url: string =
     params
      ?
       `/posts?page=${params.page}&limit=${params.limit}`
      :
       `/posts`
      return asxiosClient.get(url,{})
  },
  getListPostsOfUser: (params?: any) =>{
    const url: string = `/posts/user?page=${params.page}&limit=${params.limit}`
    return asxiosClient.get(url,{})
},
  getPostsNew: ()=>{
    const url: string = '/posts/new'
    return asxiosClient.get(url,{})
  },
  getPostsHot: ()=>{
    const url: string = '/posts/hot'
    return asxiosClient.get(url,{})
  },
  getListSearch: (queryString: string)=>{
    const url:string = `/posts/search?key=${queryString}`
    return asxiosClient.get(url)
  },
  getListSearchofUser: (queryString: string)=>{
    const url:string = `/posts/search/user?key=${queryString}`
    return asxiosClient.get(url)
  },
  getPost: (params: string)=>{
    const url:string = `/posts/${params}`
    return asxiosClient.get(url)
  },
  getComments: (params: string)=>{
    const url:string = `/comments/${params}/post`
    return asxiosClient.get(url)
  },
  postComment: (params:string,body: any)=>{
    const url:string = `/comments/${params}/post`
    return asxiosClient.post(url,body)
  },
  like: (params: string)=>{
    const url:string = `/posts/${params}/like`
    return asxiosClient.patch(url)
  },
  view: (params:string)=>{
    const url:string = `/posts/${params}/view`
    return asxiosClient.patch(url)
  },
  createPost: (body: any)=>{
    const url:string = `/posts`
    return asxiosClient.post(url, body)
  },
  deletedPost: (id: any)=>{
    const url:string = `/posts/${id}`
    return asxiosClient.delete(url)
  }
}
export default postApi;
