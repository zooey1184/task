<template>
  <div class="">
    <div class="wrap"></div>
    <div class="pane">
      <div class="flex items-center logoPane">
        <img src="@/images/logo.svg" class="logo" alt="" />
        <span class="font-size-32 ml-16 color-white">Admin</span>
      </div>
      <div class="cmp">
        <img class="w-100p" src="@/images/login-box-bg.svg" alt="" />
        <!-- <div class="tip">后台管理系统</div> -->
      </div>
    </div>
    <div class="loginPane">
      <div class="font-size-28 font-weight-600 mb-16">登录</div>
      <a-input size="large" placeholder="请输入用户名">
        <template #prefix>
          <user-outlined type="user" />
        </template>
      </a-input>
      <a-input-password class="mt-24" size="large" placeholder="请输入密码">
        <template #prefix>
          <UnlockOutlined />
        </template>
      </a-input-password>

      <a-button type="primary" size="large" block class="mt-24">登录</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    UnlockOutlined,
  },
  props: {},
  setup(props) {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/images/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: "";
    @media (max-width: 900px) {
      display: none;
    }
  }
}
.logoPane {
  position: absolute;
  left: 15vw;
  top: 10vh;
}
.logo {
  width: 50px;
  height: 50px;
}
.cmp {
  width: 20%;
  height: auto;
  position: absolute;
  top: 40vh;
  left: 10vw;
}
.tip {
  font-size: 32px;
  color: #fff;
}
.loginPane {
  position: absolute;
  right: 18vw;
  top: 30vh;
  width: 25vw;
}
</style>
