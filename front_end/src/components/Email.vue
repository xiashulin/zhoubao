<template>
  <div>
    <el-popover placement="bottom-start" width="160" trigger="hover" content="点击设置邮件地址">
      <el-button slot="reference" class="email-settging" icon="el-icon-message" @click="dialogFormVisible = true">邮件设置</el-button>
    </el-popover>
    <el-dialog title="设置邮件信息" :visible.sync="dialogFormVisible">
      <el-form :inline="true" ref="emailForm" :rules="rules" :model="email" class="demo-form-inline">
        <el-form-item label="发件邮箱地址" required prop="sendaddress">
          <el-input type="email" v-model="email.sendaddress" placeholder="发件邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="发件邮箱密码" required prop="sendpwd">
          <el-input type="password" v-model="email.sendpwd" placeholder="发件邮箱密码"></el-input>
        </el-form-item>
        <el-form-item label="收件邮箱地址" required prop="receiveaddress">
          <el-input type="email" v-model="email.receiveaddress" placeholder="收件邮箱地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('emailForm')">保存</el-button>
        </el-form-item>
      </el-form>
      <el-alert show-icon :title="errorMsg" v-show="errorMsg" type="error" center></el-alert>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Email',
  data () {
    return {
      dialogFormVisible: false,
      errorMsg: '',
      email: {
        sendaddress: '',
        sendpwd: '',
        receiveaddress: ''
      },
      rules: {
        sendaddress: [
          { required: true, type: 'email', message: '请输入正确的发件邮箱地址', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在3~30个字符', trigger: 'blur' }
        ],
        sendpwd: [
          { required: true, message: '请输入发件邮箱登录密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在6~30个字符', trigger: 'blur' }
        ],
        receiveaddress: [
          { required: true, type: 'email', message: '请输入正确的收件邮箱地址', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在3~30个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setEmail () {

    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('提交')
          var dispatchAction = this.$store.state.userEmail ? this.$store.dispatch('updateUserEmail', this.email) : this.$store.dispatch('addUserEmail', this.email)
          dispatchAction.then((response) => {
            console.log('mounted_saveEmail_succ', response)
            this.errorMsg = ''
            this.dialogFormVisible = false
          }).catch((err) => {
            console.log('mounted_saveEmail_error', err)
            this.errorMsg = '保存失败'
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch('getUserEmail').then(() => {
      if (this.$store.state.userEmail) {
        this.email.sendaddress = this.$store.state.userEmail.sendaddress
        this.email.sendpwd = this.$store.state.userEmail.sendpwd
        this.email.receiveaddress = this.$store.state.userEmail.receiveaddress
      } else {
        console.log('mounted_getEmail_null')
      }
    }).catch((err) => {
      console.log('mounted_getEmail_error', err)
    })
  }
}
</script>
<style>
.email-settging {
  margin-top:10px;
  float: right;
  /* padding: 10px; */
  margin-right: 10px;
  background: transparent;
}
</style>
