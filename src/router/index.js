import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象router
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid', // 动态路由传递id，id是参数。请求商品对应的数据信息
    component: Detail
  }
//   {
//     path: '/detail',
//     component: Detail
//   }
] // 在这里配置我们的映射关系
const router = new VueRouter ({
  routes,
  mode: 'history'
})

// 3.导出
export default router
