<template>
  <div class="mask" @touchmove.prevent v-if='state.visible'>
    <div class="content">
      <img src="../images/close.png" @click='state.visible=false' class="closeImg" alt="">
      <div class="_title">
        Authorize your wallet
      </div>
      <div class="_desc">
        We found that the browser has not added metamask yet. Once you have it installed, go ahead and refresh the page.
      </div>
      <a class="_btn" href='https://metamask.io/'>
        <img style="width: 35px; height: 35px" src="../images/metamask.png" alt="">
        <div style="margin-left: 16px">
          Install Metamask
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean
    }
  },
  emits: ['update:visible'],
  setup(props, {emit, expose}) {
    const state = reactive({
      visible: props.visible
    })
    watch(() => props.visible, (n) => {
      state.visible = n
    })
    watch(() => state.visible, (n) => {
      emit('update:visible', n)
    })

    return {
      state
    }
  }
})
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  .content {
    width: 30vw;
    border-radius: 10px;
    background: rgb(42, 43, 51);
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
    font-size: 14px;
    max-width: 350px;
    padding: 24px;
  }
  @media (max-width: 400px) {
    .content {
      width: 80vw;
      top: 150px;
    }
  }
  .closeImg {
    position: absolute;
    right: 18px;
    top: 18px;
  }
  ._title {
    font-size: 20px;
  }
  ._desc {
    font-size: 14px;
    margin: 32px 0;
    color: rgb(153, 153, 153);
  }
  ._btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: -webkit-linear-gradient(359.94deg,#a86acf .05%,#46fcd2 99.95%),#0c0c30!important;
    background: linear-gradient(90.06deg,#a86acf .05%,#46fcd2 99.95%),#0c0c30!important;
    border-radius: 10px;
    border: none;
    margin: 0 auto;
    margin-top: 40px;
    color: #000;
    user-select: none;
    cursor: pointer;
    &:active {
      opacity: 0.8;
    }
  }
}
</style>