<template>
  <div class="app">
    <h1>404，你访问的页面不存在……</h1>
    <h3><router-link to="/zhoubao" class="href">返回首页</router-link></h3>
  </div>
</template>
<script>
export default {
}
</script>
<style>
.app {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(218, 165, 144, 0.18);
  text-align: center;
}
.app h1 {
  margin-top: 10%;
  color:darkgoldenrod
}
.app h3 {
  margin-top: 3%;
}
.href {
  background: lightblue;
  padding: 8px;
  text-decoration: none;
  color: indianred;
  border-radius: 5px;
}
</style>
