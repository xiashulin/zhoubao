<template>
  <div class="container container_bg_size">
    <div class="login">
      <div class="title"><span>&nbsp;&nbsp;登录·LOGIN&nbsp;&nbsp;</span></div>
      <div class="user">
        <input type="text" v-model="user" placeholder="用户名" maxlength="18" minlength="4">
      </div>
      <div class="pwd">
        <input type="password" v-model="pwd" placeholder="密码" maxlength="18" minlength="6">
      </div>
      <div class="btn">
        <button @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
// import { isInteger } from '@/utils/index'
import { Toast, Indicator } from 'mint-ui'

export default {
  name: 'login',
  data () {
    return {
      user: '',
      pwd: ''
    }
  },
  methods: {
    submit () {
      if (!this.user || !this.pwd) {
        Toast('请输入用户名和密码')
      } else if (this.user.trim().length > 18 || this.user.trim().length < 4) {
        Toast('用户名长度应为6~18个字符')
      } else if (this.pwd.trim().length > 18 || this.pwd.trim().length < 6) {
        Toast('密码长度应为6~18个字符')
      } else {
        Indicator.open('请稍后...')

        this.$store.dispatch('login', {
          user: this.user,
          pwd: this.pwd
        }).then((res) => {
          Indicator.close()
          this.$router.replace('/zhoubao')
        }).catch(() => {
          Indicator.close()
        })
      }
    }
  }
}
</script>
<style scoped>
body {
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
.container {
  width: 100%;
  float: left;
  height: 100%;
  position: fixed;
  background-image: url('../assets/lg_bg.jpg');
  background-position: center;
  background-repeat: no-repeat
}

@media only screen and (max-width:500px) {
  .container_bg_size {
     background-size: auto;
  }
}

@media only screen and (min-width:550px) {
  .container_bg_size {
     background-size: 100% 100%;
  }
}

.login {
  opacity: 0.8;
  margin: 0 auto;
  margin-top: 20%;
  width: 300px;
  height: 180px;
  text-align: center;
  border-top:#e9efdd;
  border-top-style: solid;
  border-top-width: 0.5px;

  border-bottom: yellowgreen;
  border-bottom-style: dotted;
  border-bottom-width: 0.5px;

}
input {
  border-radius: 5px;
  width: 200px;
  height: 30px;
  border-width: 1px;
  font-size: 20px;
}
.title {
  margin-top: -18px;
}
.title span {
  color: whitesmoke;
  width: 100px;
  background:#a7bfd8;
  font-size: 22px;
}
.user {
  padding-top: 20px;
  padding-bottom: 20px;
}
.pwd {
  padding-bottom: 20px;
}
button {
  width:100px;
  border-radius: 5px;
  border-width: 1px;
  height: 35px;
  font-size: 20px;
  background-color: darkseagreen;
  color: aliceblue;
}
</style>
