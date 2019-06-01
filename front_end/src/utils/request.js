import axios from 'axios'
import { Toast } from 'mint-ui'
import { getToken } from '@/utils/auth'

// 创建axios 实例

const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.data.session = getToken()
    }
    // 去掉字符串类型参数前后的空格
    // console.log('request data', JSON.stringify(config.data))
    for (var i in config.data) {
      if (Object.prototype.toString.call(config.data[i]) === '[Object String]') {
        config.data[i] = config.data[i].trim()
      }
    }
    return config
  }, error => {
    console.log('request error', error)
    Toast({ message: '网络连接错误，请稍候再试' })
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      Toast({ message: res.msg })
      return Promise.reject(res.msg)
    } else {
      return res
    }
  },
  error => {
    console.log('error222', error)
    Toast({ message: '服务器连接错误，请稍候再试' })
    return Promise.reject(error)
  }
)

export default service
