<template>
  <section>
    <div class="gray-9 font-size-20">BET REWARDS</div>
    <div class="gray mt-24">
      Adding USDT to create casino or betting to Get BET Token
    </div>
    <div class="IndzhiB">
      <div class="IndzhiBP">BET Token</div>
    </div>

    <div class="flex items-center mt-16">
      <div class="active-border betBtn">
        BUY BET
        <img class="ml-8" src="../../images/icons/share.png" alt="" />
      </div>

      <div class="ml-24">
        Add To Wallet
        <PlusCircleOutlined />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from "vue";
import { PlusCircleOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    PlusCircleOutlined,
  },
  props: {
    account: {
      type: [String, Number],
      default: "-",
    },
  },
  setup(props) {},
});
</script>

<style lang="less" scoped>
.betBtn {
  cursor: pointer;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  user-select: none;
  transition: all 100ms linear;
  &:hover {
    background: var(--primary-main);
  }
  &:active {
    opacity: 0.8;
  }
}
</style>
