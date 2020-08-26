import axios from 'axios'

export function request (config) {
  // 1.创建axios的实例
  const instance = axios.create ({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
    // 要return一下，因为你上面拦截了，若是不return，你使用的request那里就会出错拿不到数据
  }, err => {
    console.log(err)
  })
  instance.interceptors.response.use(res => {
    return res.data
    // 若是不返回出去，就得不到结果。只用返回res.data就行了
  }, err => {
    console.log(err)
  })

  // 3.发送真正的请求
  return instance(config)
}
