<template>
  <div class="home">
   <h1>首页</h1>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { userInfo } from '@/api/api'

export default {
  name: 'home',
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    Indicator.open('请稍后...')
    userInfo({}).then(response => {
      this.userInfo = response.data
      console.log('dddddddddd', this.userInfo)
      Indicator.close()
    }).catch(errs => {
      Indicator.close()
    })
  }
}
</script>
