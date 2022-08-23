<template>
  <div
    class="root-item flex bg justify-center linear-border a"
    v-if="!isLink"
    @click="handleConnect"
  >
    激活房间号
  </div>
  <div
    class="rootbtn flex bg justify-center linear-border"
    v-if="isLink"
    @click="handleInRoom"
  >
    进入房间
  </div>
</template>

<script>
import { defineComponent, reactive, computed, inject } from "vue";

export default defineComponent({
  components: {},
  emits: ["init"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const handleConnect = () => {
      ACCOUNTS.link();
    };

    const handleInRoom = () => {
      emit("init");
    };

    return {
      state,
      isLink,
      handleConnect,
      handleInRoom,
    };
  },
});
</script>

<style lang="less" scoped>
.root-item {
  width: 120px;
  height: 38px;
  align-items: center;
  border-radius: 30px;
  padding: 0 16px;
  text-align: center;
  cursor: pointer;
  transition: all linear 200ms;
  position: relative;
}
.a {
  animation: loading 8s linear infinite;
  background-image: linear-gradient(
    50deg,
    #020318,
    #40174d 52%,
    #40174d 55%,
    #020318 58%,
    #020318
  );
  background-size: 400% 100%;
  &:hover {
    // background: #1e5385;
    background-image: linear-gradient(
      50deg,
      #020318,
      #c17bfd 52%,
      #c17bfd 55%,
      #020318 58%,
      #020318
    );
  }
}
@keyframes loading {
  0% {
    background-position: 400% 50%;
  }
  to {
    background-position: 0% 50%;
  }
}
.rootbtn {
  .root-item;
  background-image: linear-gradient(
    to right,
    var(--primary-main),
    var(--primary-sub)
  );
}
</style>
