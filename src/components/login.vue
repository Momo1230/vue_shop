<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt="logo">
      </div>
      <!--form表单-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import loginModel from '../api/login.js';
export default {
  data () {
    return {
      //form表单数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //form表单校验规则
      loginFormRules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:10,message:'用户名长度在3-10个字符',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:15,message:'密码有效长度为6-15',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    resetLoginForm(){
      this.$refs.loginForm.resetFields();
    },
    login(){
      this.$refs.loginForm.validate(valid=>{
        if(!valid) return;
        loginModel.login(this.loginForm).then(res => {
          console.log(this)
          if(res.meta.status == 200){
            this.$message.success('登录成功!');
            //1、将登录成功之后的token保存到客户端的sessionStorage中
            //   1.1项目中出现了登录之外的其他API接口，必须在登录之后才能访问
            //   1.2token只应在当前网站打开期间生效，当前会话窗口生效的话，就将token保存在sessionStorage中
            //2、通过编程式导航跳转到后台主页，路由地址是 /home
            window.sessionStorage.setItem('login_token',res.data.token);
            this.$router.push('/home');
          }else{
            this.$message.error('登录失败!');
          }
        }).catch(err => console.log(err))
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container{background-color: #2b4b6b;height:100%;position: relative;
    .login_box{background-color: #fff;width:450px;height:300px;border-radius: 4px;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);-moz-transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);-o-transform: translate(-50%,-50%);
      .avatar_box{width:130px;height:130px;border-radius:50%;border:1px solid #eee;padding: 10px;box-shadow: 0 0 10px #ddd;position: absolute;left:50%;transform: translate(-50%,-50%);
        img{width:100%;border-radius:50%;background-color: #eee;}
      }
      .login_form{position: absolute;bottom: 0;width:100%;padding: 0 20px;box-sizing: border-box;}
      .btns{display: flex;justify-content: flex-end;}
    }
  }
</style>
