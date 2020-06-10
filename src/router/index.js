import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import AddressList from "../views/AddressList";
import AddressNew from "../views/AddressNew";
import AddressEdit from "../views/AddressEdit";
import OrderForm from "../views/OrderForm"
import PaymentSuccess from "../views/PaymentSuccess"
import OrderInfo from "../views/OrderInfo";
import FirstIndex from "../views/FirstIndex";
import MyOrder from "../views/MyOrder";
import UAVInfo from "../views/UAVInfo";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'FirstIndex',
        component: FirstIndex
    },
    {
        path: '/shop',
        name: 'shop',
        component: index
    },
    {
        path: '/addressList',
        name: '地址列表',
        component: AddressList
    },
    {
        path: '/addressNew',
        name: '新增地址',
        component: AddressNew
    },
    {
        path: '/addressEdit',
        name: '修改地址',
        component: AddressEdit
    },
    {
        path: '/orderForm',
        name: '订单页面',
        component: OrderForm
    },
    {
        path: '/paymentSuccess',
        name: '支付成功',
        component: PaymentSuccess
    },
    {
        path: '/orderInfo',
        name: '订单信息',
        component: OrderInfo
    },
    {
        path: '/myOrder',
        name: '已购买',
        component: MyOrder
    },
    {
        path: '/UAVInfo',
        name: '无人机信息',
        component: UAVInfo
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
