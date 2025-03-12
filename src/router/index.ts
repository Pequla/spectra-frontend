import AddressList from '@/views/AddressList.vue'
import EditAddress from '@/views/EditAddress.vue'
import EditLocation from '@/views/EditLocation.vue'
import EditNetwork from '@/views/EditNetwork.vue'
import LocationList from '@/views/LocationList.vue'
import Login from '@/views/Login.vue'
import NetworkList from '@/views/NetworkList.vue'
import NewLocation from '@/views/NewLocation.vue'
import NewNetwork from '@/views/NewNetwork.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/network'
    },
    {
      path: '/network',
      component: NetworkList
    },
    {
      path: '/network/:id/address',
      component: AddressList
    },
    {
      path: '/network/:id',
      component: EditNetwork
    },
    {
      path: '/network/new',
      component: NewNetwork
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/location',
      component: LocationList
    },
    {
      path: '/location/new',
      component: NewLocation
    },
    {
      path: '/location/:id',
      component: EditLocation
    },
    {
      path: '/address/:id',
      component: EditAddress
    }
  ],
})

export default router
