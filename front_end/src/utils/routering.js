import router from '../router'
import { getToken } from '@/utils/auth'

const WhiteList = ['/login', '/regist']

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    // console.log('request path:', to.path)
    // console.log(WhiteList.indexOf(to.path))
    if (WhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {})
