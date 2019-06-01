<template>
  <div>
    <el-link type="danger" class="exit" @click="logout">退出</el-link>
    <span v-cloak class="uname"> 欢迎：{{ nickname }} </span>
  </div>
</template>
<script>

export default {
  data () {
    return {
      nickname: ''
    }
  },
  name: 'User',
  methods: {
    logout () {
      if (window.confirm('确定要退出吗')) {
        this.$store.dispatch('logout')
        this.$router.replace('/login')
      }
    }
  },
  mounted () {
    this.$store.dispatch('userInfo').then((res) => {
      this.nickname = this.$store.state.userInfo.nickname
    }).catch(() => {
      this.nickname = 'nickerr'
    })
  }
}
</script>

<style>
.uname {
  margin-top:19px;
  float: right;
  margin-right: 15px;
}
.exit {
  margin-top:19px;
  float: right;
  margin-right: 15px;
  font-size: 16px;
}
</style>
