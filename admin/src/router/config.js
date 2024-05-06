import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewsAdd from '../views/news-manage/NewAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewsEdit.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'
import NotFound from '../views/notfound/NotFound.vue'

const routes = [
    {
        path: '/index',
        component: Home
    },
    {
        path: '/center',
        component: Center
    },

    // User-Manage页面
    {
        path: '/user-manage/adduser',
        component: UserAdd,
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        component: UserList,
        requireAdmin: true
    },

    // News-Manage页面
    {
        path: '/news-manage/addnews',
        component: NewsAdd
    },
    {
        path: '/news-manage/newslist',
        component: NewsList
    },
    {
        path: '/news-manage/editnews/:id',
        component: NewsEdit
    },

    // Product-Manage页面
    {
        path: '/product-manage/addproduct',
        component: ProductAdd
    },
    {
        path: '/product-manage/productlist',
        component: ProductList
    },
    {
        path: '/product-manage/editproduct/:id',
        component: ProductEdit
    },

    
    {
        path: "/",
        redirect:'/index'
    },
    {
        path: "/:pathMatch(.*)*",
        name:'NotFound',
        component:NotFound
    },
]


export default routes