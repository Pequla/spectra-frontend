import AddressList from '@/views/address/AddressList.vue'
import EditAddress from '@/views/address/EditAddress.vue'
import EditLocation from '@/views/address/EditLocation.vue'
import LocationList from '@/views/location/LocationList.vue'
import NewLocation from '@/views/location/NewLocation.vue'
import Login from '@/views/Login.vue'
import EditNetwork from '@/views/network/EditNetwork.vue'
import NetworkList from '@/views/network/NetworkList.vue'
import NewNetwork from '@/views/network/NewNetwork.vue'
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
