<template>
  <div class="wrap primary-bg">
    <div class="win-logo ff" v-if="info.win_amount > 0">WIN</div>

    <div>bet : {{ info.bet_amount }}</div>
    <div class="flex">
      <div>odds : {{ info.odds }}</div>
      <div class="ml-8">score : {{ info.score }}</div>
    </div>
    <div>Amount: {{ info.win_amount }}</div>

    <div
      v-if="info.win_amount > 0 && info.is_claimed === '0'"
      class="itembtn pos-r active-bg mt-8"
      @click="handleClaim(info)"
    >
      CLAIM
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import useMethods from "@/sport/hooks/use-claim";
import usePermission from "@/sport/hooks/use-methods";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {},
  props: {
    info: {
      type: Object,
    },
  },
  setup(props) {
    const state = reactive({});

    const { handleMethods } = useMethods();

    const { getPermission, hasPermission } = usePermission();

    const handleClaim = async (item) => {
      const _hasPermission = await hasPermission();
      handleMethods({
        name: "claim",
        params: [item.market_id, item.bet_id],
        callback: (h, r, e) => {
          if (r) {
            message.success("success");
          }
          if (e) {
            console.log(e);
          }
        },
      });
    };
    return {
      state,
      handleClaim,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  padding: 16px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  // height: 136px;
}
.win-logo {
  width: 80px;
  height: 80px;
  border-radius: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(197, 39, 150);
  border: 2px solid #999;
  transform: rotate(-40deg);
  position: absolute;
  right: -10px;
  top: -20px;
}
.itembtn {
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>
