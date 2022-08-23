<template>
  <Spin :spinning="state.loading">
    <div class="flex items-center justify-center">
      <img src="../../images/v2/room-logo.png" style="width: 200px" alt="" />
    </div>
    <div
      class="font-size-16 text-align-center mt-24 mb-16 font-weight-600 active-color"
    >
      CASINO INSTRUCTIONS
    </div>
    <div class="font-size-14 my-8 text-align-center line-height-16 color-black">
      AFTER CREATE CASINO AND ADD USDT POOL USERS IMMEDIATELY GENERATE THEIR OWN
      “CASINO CODE” AND BECOME BOOKMAKERS, OTHERS CAN ENTER THE CASINO BY
      INPUTTING THE “CASINO CODE”THE USDT POOL CAN BE WITHDRAWN AT ANY TIME IF
      NO BETS ARE IN PROGRESS
    </div>
    <div class="title text-align-center line-height-16 color-gray">
      IF OTHER USERS ARE BETTING IN YOUR CASINO, YOU WILL RECEIVE A MASSIVE BET
      TOKEN REWARD.
    </div>

    <div class="flex items-center justify-between my-24">
      <div
        class="roombtn active-border"
        v-for="item in state.btns"
        @click="handlePick(item)"
        :class="{
          'bg-white': state.active !== item.value,
          'color-white': state.active === item.value,
          'active-color': state.active !== item.value,
          'active-bg': state.active === item.value,
        }"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="input-wrap active-border flex items-center">
      <input
        class="flex-1 input"
        v-model="state.code"
        placeholder="请输入房间号(8位数字)"
        :maxlength="8"
      />
      <div class="roomConfirm active-bg color-white" @click="handleConfirm">
        CONFIRM
      </div>
    </div>
  </Spin>
</template>

<script>
import {
  defineComponent,
  onMounted,
  reactive,
  inject,
  computed,
  watch,
} from "vue";
import usePermission from "@/sport/components/useHooks/use-permission";
import { message } from "ant-design-vue";
import { createTenant, saveTenant } from "@/sport/api/index";
import { Spin } from "ant-design-vue";

export default defineComponent({
  components: {
    Spin,
  },
  props: {
    type: {
      type: String,
    },
  },
  emits: ["next", "ok"],
  setup(props, { emit }) {
    const state = reactive({
      active: "create",
      code: "",
      btns: [
        {
          label: "LOOK FOR CASINO",
          value: "other",
        },
        {
          label: "CREAT CASINO",
          value: "create",
        },
      ],
      loading: false,
    });

    watch(
      () => props.type,
      (n) => {
        if (n) {
          state.active = n;
        }
      },
      {
        immediate: true,
      }
    );
    const ACCOUNTS = inject("ACCOUNTS");
    const ROOM = inject("ROOM");
    const accounts = computed(() => ACCOUNTS.accounts.value);
    const handleCreate = (roomId) => {
      state.loading = true;
      createTenant({
        wallet: accounts.value[0],
        tenant: roomId,
      })
        .then((res) => {
          console.log(res);
          emit("next");
        })
        .finally(() => {
          state.loading = false;
        });
    };

    const handleJoinOther = (roomId) => {
      state.loading = true;
      saveTenant({
        wallet: accounts.value[0],
        tenant: roomId,
      })
        .then((res) => {
          console.log(res);
          if (res) {
            // ROOM.setState({
            //   otherCode: roomId,
            // });
            // 第一期暂时这样
            if (res) {
              ROOM.setState({
                code: roomId,
              });
            }
          }
          emit("ok", state.active);
        })
        .finally(() => {
          state.loading = false;
        });
    };
    const handlePick = (item) => {
      state.active = item.value;
    };

    const { hasPermission, getPermission } = usePermission();
    const handleConfirm = async () => {
      if (state.code?.match(/^\d{8}$/g)) {
        if (state.active === "create") {
          handleCreate(state.code);
        } else if (state.active == "other") {
          handleJoinOther(state.code);
        }
      } else {
        message.warning("房间号格式为8位数字");
      }
    };

    const handleInit = async () => {
      const hasP = await hasPermission();
      if (!hasP) {
        getPermission({
          callback: () => {
            message.info(
              "Permission verification sent Success, Please wait link"
            );
          },
          receipt: () => {
            message.success("Successfully linked");
            emit("next");
          },
          error: (e) => {
            const msg = e.message?.split("{")?.[0] || "Verification failed";
            message.error(msg);
          },
        });
      }
    };

    onMounted(() => {
      // handleInit();
    });

    return {
      state,
      handlePick,
      hasPermission,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.pane {
  padding: 16px;
  border-radius: 12px;
}
.roombtn {
  height: 42px;
  border-radius: 10px;
  line-height: 42px;
  text-align: center;
  width: 45%;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.input-wrap {
  border-radius: 4px;
  overflow: hidden;
}
.input {
  padding-left: 8px;
  height: 42px;
  border: none;
  outline: none;
  line-height: 42px;
  font-size: 18px;
}
.roomConfirm {
  padding: 0 24px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  font-size: 18px;
  transition: all 300ms linear;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
.importBtn {
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
}
</style>
