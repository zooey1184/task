<template>
  <Spin :spinning="getLoading">
    <div>
      <div class="active-color font-size-18 font-weight-600 text-align-center">
        CONFIRM CREATION
      </div>
      <div class="mt-16 mb-16 flex justify-center">
        <img style="width: 150px" src="../../images/v2/room-rect.png" />
      </div>
      <div class="mt-24 mb-16 font-size-12 line-height-18 text-align-center">
        <div>AFTER THE CASINO IS CREATED,</div>
        THE CASINO WILL AUTOMATICALLY OPEN TO ACCEPT ALL BETS, PLAYERS ENTER THE
        CASINO BY “CASINO CODE”. CLICK "CLOSE DOWN” TO CLOSE THE CASINO, THE
        CASINO WILL NO LONGER ACCEPT BETS. AND THE USDT POOL CAN BE WITHDRAWN
        AFTER ALL THE GAMES BETTED IN THE POOL ARE OVER
      </div>
      <div class="font-size-14 mt-24">ENTER THE AMOUNT</div>
      <div class="input-wrap flex items-center">
        <input
          class="flex-1 input"
          v-model="state.amount"
          type="number"
          placeholder="请输入金额"
        />
        <div class="roomConfirm active-bg color-white">USDT</div>
      </div>
      <div class="color-gray mt-8 font-size-12">
        YOU CAN'T INCREASE OR DECREASE A BET HALFWAY THROUGH
      </div>
      <div
        class="confirmBtn active-bg color-white mt-16 mb-16"
        @click="handleCreateBetPool"
      >
        CONFIRM CREATION
      </div>
    </div>
  </Spin>
</template>

<script>
import { reactive, defineComponent, computed } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Circle from "./circle.vue";
import usePermission from "@/sport/hooks/use-methods";
import { message, Spin } from "ant-design-vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    Circle,
    Spin,
  },
  emits: ["next"],
  setup(props, { emit }) {
    const state = reactive({
      amount: "",
    });
    const {
      getPermission,
      hasPermission,
      createPool,
      createPoolLoading,
      authLoading,
    } = usePermission();

    const getLoading = computed(
      () => createPoolLoading?.value || authLoading?.value
    );

    const handleCreateBetPool = async () => {
      const MAX = 999999;
      const MIN = 1;
      if (state.amount > MAX) {
        message.warning(`金额不能超过${MAX}`);
        return;
      }
      if (state.amount < MIN) {
        message.warning(`金额不能小于${MIN}`);
        return;
      }
      const _hasPermission = await hasPermission();
      if (_hasPermission) {
        await createPool(state.amount, (h, r, e) => {
          if (r) {
            message.success("创建成功");
            emit("next");
          }
        });
      } else {
        getPermission(async (h, r, e) => {
          if (r) {
            message.success("授权成功");
            await createPool(state.amount, (h, r, e) => {
              if (r) {
                message.success("创建成功");
                emit("next");
              }
            });
          }
        });
      }
    };

    const handleChangeAmount = () => {
      console.log(state.amount);
      if (state.amount?.toString().length > 7) {
        message.warning("金额不能超过 999999");
        return;
      }
    };

    return {
      state,
      handleCreateBetPool,
      getLoading,
      // handleChangeAmount,
    };
  },
});
</script>

<style lang="less" scoped>
.input-wrap {
  border-radius: 4px;
  overflow: hidden;
}
.input {
  background: #fff;
  padding-left: 8px;
  height: 42px;
  outline: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  outline: none;
  border: 2px solid var(--primary-main);

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
  &:hover {
    opacity: 0.8;
  }
}

.confirmBtn {
  height: 42px;
  width: 100%;
  text-align: center;
  line-height: 42px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
</style>
