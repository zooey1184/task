<template>
  <div class="flex items-center h-100p p-8 justify-between">
    <div>
      <!-- <MenuFoldOutlined @click="handleCloseMenu" /> -->
    </div>
    <div>
      <a-dropdown>
        <img
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt=""
          style="width: 30px; height: 30px; margin-right: 4px"
        />
        <template #overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="logout">
              <PoweroffOutlined />
              退出
            </a-menu-item>
            <a-menu-item key="resetPwd"> 修改密码 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, reactive } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PoweroffOutlined,
  },
  props: {},
  setup(props) {
    const state = reactive({});
    const LAYOUT = inject("LAYOUT");
    const handleCloseMenu = () => {
      LAYOUT.handleSiderCollapse();
    };

    const handleLogout = () => {
      console.log("logout");
    };
    const handleChangePwd = () => {
      console.log("changepwd");
    };
    const handleClick = (e) => {
      if (e.key === "logout") {
        handleLogout();
      } else if (e.key === "resetPwd") {
        handleChangePwd();
      }
    };
    return {
      state,
      handleCloseMenu,
      handleClick,
    };
  },
});
</script>
