<template>
  <div>
    <el-form
    class="login-container"
    ref="AccountForm"
    :model="account"
    :rules="loginRules"
    label-position="center">
    <h1 class="title"> 教务系统平台</h1>
    <hr>
    <el-form-item prop="username">
      <el-input v-model="account.username" type="text" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input  v-model="account.password" type="password" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked>记住密码</el-checkbox>

    <el-form-item>
      <el-button @click.native.prevent="handleLogin" :loading="logining" type="primary" style="width:350px; background-color:skyblue" >登录</el-button>
      
    </el-form-item>
    <el-form-item>
      <el-button @click.native.prevent="reset" type="primary" style="width:350px; background-color:skyblue" >重置</el-button>
    </el-form-item>

  </el-form>

  </div>
</template>

<script>
import {requsetLogin} from '../axios/api'

export default {
  name: '登录',
  data () {
     var validateUsername = (rule,value,callback)=>{
        if(value ===''){
          return callback(new Error("账号不能为空"));
        }else{
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        const id = /^[0-9A-Za-z]{6,}$/;
        if (!id.test(value)) {
          callback(new Error('密码不能少于五位'));
        } else {
          callback();
        }
      };

    return {
      account: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, validator:validateUsername, trigger: 'blur'}],
        password: [{required: true, validator:validatePassword, trigger: 'blur'}]
      },
      checked: true,
      logining: false
    }
  },
  mounted:function(){
     history.pushState(null, null, document.URL);//给网站修改和添加历史记录
        window.addEventListener('popstate', function () {//监听浏览器的回退按钮
            history.pushState(null, null, document.URL);
        });

  },
 
  methods: {

    handleLogin () {
      this.$refs.AccountForm.validate((valid) => {
        if (valid) {
          this.logining = true
          let loginParams = {
            username: this.account.username,
            password: this.account.password
          }
          // 调用axios登录接口
          requsetLogin(loginParams).then(res => {
            this.logining = false
            // 根据返回的code判断是否成功
            let { code, msg, user } = res.data
            if (code === 200) {
              this.$message({
                type: 'success',
                message: msg
              })
              // 登陆成功，用户信息就保存在sessionStorage中
              sessionStorage.setItem('user', JSON.stringify(user))
              // 跳转到后台主页面
              // this.$router.push({ path: '/home' })
              this.$router.replace({ path: '/home' })
            } else {
              this.$message({
                type: 'error',
                message: msg
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    reset(){
      this.$refs.AccountForm.resetFields()
    }

  }
}
</script>

<style >
  body{
    background:url("../assets/timg.jpg") no-repeat;
    background-size: 100%;
  }
  .login-container{
    width:350px;
    margin-left:40%;
    margin-top:20%;
  }
  .el-input {
    height: 47px;
  }
  .title{
    color: blue;
    text-align:center;

  }

</style>
