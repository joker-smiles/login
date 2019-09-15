<template>
  <div >
    <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-user" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button @click="logout" type="primary" >退出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>管理员</span>
    </el-header>
    </el-container>
    <h1 style="text-align:center">{{ msg }}</h1>

  </div>
</template>

<script>
export default {
  name: '后台主界面',
  data () {
    return {
      msg: '恭喜你登陆成功'
    }
  },
  mounted:function(){
     history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });

  },
  methods: {

    logout () {
      this.$router.push({ path: '/login' })
    },

  }
}
</script>
<style >
  body{
    background: rgb(162, 187, 233);
  }

</style>
