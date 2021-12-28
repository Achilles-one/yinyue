<template>
  <div class="login-bg">
    <div class="login-contain">
      <div class="login-header">
        <p>欢迎登录</p>
      </div>

      <div class="form-group">
        <div class="form-item">
          <label for="username">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yonghu-yuan"></use>
            </svg>
          </label>
          <input
            v-model="phone"
            type="text"
            id="username"
            placeholder="请输入账号"
            autocomplete="new-password"
          />
        </div>

        <div class="form-item">
          <label for="password">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="请输入密码"
            autocomplete="new-password"
          />
        </div>
      </div>

      <div class="button-group">
        <button @click="loginEvent" class="login-btn" id="doLogin">登录</button>
      </div>

      <div class="login-bottom">
        <p class="line">其他登录方式</p>
        <div class="login-box">
          <div class="box-item">
            <a href="#">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liaotian"></use>
              </svg>
              <p>微信登录</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    async loginEvent() {
      let res = await this.$store.dispatch('login', {phone:this.phone, password: this.password})
      if(res.data.code===200){
        this.$router.push({name: 'My'})
      }
    },
  },
};
</script>

<style lang="less" scoped>
a {
  list-style: none;
  text-decoration: none;
}

.login-bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 11;
  background-color: #b3d2d4;
  color: #ffffff;
  background-size: 100% 100%;
}
.login-contain {
  width: 80%;
  margin: 0 auto;

  .login-header {
    padding: 5%;
    p {
      font-size: 32px;
      color: #ffffff;
      font-weight: bold;
      text-align: center;
      letter-spacing: 2px;
      text-shadow: 0.1em 0.15em 0.1em #74c3ca;
    }
  }

  .form-group {
    padding: 5%;

    .form-item {
      margin-top: 5%;
      padding: 0 10px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.1);

      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #ffffff;
        position: absolute;
        margin-top: 8px;
      }

      input {
        outline: none;
        border: 0;
        background-color: transparent;
        color: #ffffff;
        height: 40px;
        font-size: 18px;
        width: 55%;
        margin-left: 12%;
      }
      input::-webkit-input-placeholder {
        color: #ffffff;
        font-size: 16px;
      }
      input:-moz-placeholder {
        color: #ffffff;
        font-size: 16px;
      }
      input::-moz-placeholder {
        color: #ffffff;
        font-size: 16px;
      }
      input:-ms-input-placeholder {
        color: #ffffff;
        font-size: 16px;
      }

      // label .icon {
      //   width: 25px;
      //   position: absolute;
      //   margin-top: 5px;
      // }
    }
  }

  .button-group {
    padding: 5%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    button {
      outline: none;
      // background: transparent;
      background-color: #6dc5e7;
      border: 1px solid #6dc5e7;
      color: #ffffff;
      width: 85%;
      height: 35px;
      border-radius: 20px;
      float: right;
      padding: 1%;
    }
  }
  .login-bottom {
    // background-color: black;
    color: #74c3ca;
    padding: 0 5%;

    .line {
      display: block;
      position: relative;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
    }
    .line:before,
    .line:after {
      content: "";
      position: absolute;
      top: 50%;
      background: #ffffff;
      width: 20%;
      height: 1px;
    }

    .line:before {
      left: 10%;
    }
    .line:after {
      right: 10%;
    }

    .login-box {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 20px;

      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #ffffff;
      }

      div {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
      }
      p {
        text-align: center;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>