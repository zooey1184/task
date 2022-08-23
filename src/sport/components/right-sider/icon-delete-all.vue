<template>
  <Icon @mousemove="handleHover" @mouseleave="handleLeave">
    <template #component>
      <svg t="1655046738266" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8257" :width="size" :height="size">
        <path d="M672 256c16.953 0 32.987 6.696 45.145 18.855C729.304 287.013 736 303.047 736 320v512c0 16.953-6.696 32.987-18.855 45.145S688.953 896 672 896H224c-16.954 0-32.986-6.696-45.145-18.855S160 848.953 160 832V320c0-16.953 6.696-32.987 18.855-45.145C191.014 262.696 207.046 256 224 256h448m0-64H224c-70.4 0-128 57.6-128 128v512c0 70.4 57.6 128 128 128h448c70.4 0 128-57.6 128-128V320c0-70.4-57.6-128-128-128z" p-id="8258" :fill="state.color"></path>
        <path d="M800 64H352v64h448c35.2 0 64 28.8 64 64v576h64V192c0-70.4-57.6-128-128-128z" p-id="8259" :fill="state.color"></path>
        <path d="M598.765 425.236c-12.445-12.445-32.81-12.445-45.255 0L448 530.745l-105.51-105.51c-12.445-12.445-32.81-12.445-45.255 0s-12.445 32.81 0 45.255L402.745 576l-105.51 105.51c-12.445 12.445-12.445 32.81 0 45.255s32.81 12.445 45.255 0L448 621.255l105.51 105.51c12.445 12.445 32.81 12.445 45.255 0s12.445-32.81 0-45.255L493.255 576l105.51-105.51c12.445-12.445 12.445-32.809 0-45.254z" p-id="8260" :fill="state.color"></path>
      </svg>
    </template>
  </Icon>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import Icon from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    Icon
  },
  props: {
    size: {
      type: [String, Number],
      default: 18
    }
  },
  setup(props) {
    const state = reactive({
      color: '#6d819c'
    })
    const handleHover = () => {
      state.color = '#16bdf9'
    }
    const handleLeave = () => {
      state.color = '#6d819c'
    }
    return {
      state,
      handleHover,
      handleLeave
    }
  }
})
</script>