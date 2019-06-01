<template>
  <div id="app">
    <h3>注册页</h3>
    <input type="text" placeholder="姓名" v-model="name">
    <p>姓名是:{{ name }}</p>
    <br>
    <textarea name="desc" id="desc" cols="30" rows="10" v-model="description" placeholder="介绍"></textarea>
    <p style="white-space:pre-line">介绍是:{{ description }}</p>
    <br>
    是否记住密码：<input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
    <br><br>
    <div id="example-3">
      <input type="checkbox" value="music" id="music" v-model="checkedNames">
      <label for="music">音乐</label>
      <input type="checkbox" value="dance" id="dance" v-model="checkedNames">
      <label for="dance">跳舞</label>
      <input type="checkbox" value="draw" id="draw" v-model="checkedNames">
      <label for="draw">绘画</label>
      <input type="checkbox" value="shopping" id="shopping" v-model="checkedNames">
      <label for="shopping">购物</label>
      <p>爱好是：{{ checkedNames }}</p>
    </div>
    <div id="example-radio">
      <input type="radio" v-model="sex" id="male" value="male">
      <label for="maile">男</label>
      <input type="radio" v-model="sex" id="female" value="female">
      <label for="female">女</label>
      <p>性别是：{{ sex }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      name: 'gege',
      description: '从前有做山\r\n山里有座庙',
      checked: false,
      checkedNames: ['shopping'],
      sex: 'female'
    }
  }
}
</script>
