<template>
  <div class="TCB1"></div>
  <div style="z-index: 1000">
    <step-1 :visible="state.active===1" @close="handleClose" @confirm="handleConfirm" />
    <step-2 :visible="state.active===2" @close="handleClose" @confirm="handleConfirm" />
    <step-3 :visible="state.active===3" @close="handleClose" @confirm="handleConfirm" />
    <step-4 :visible="state.active===4" @close="handleClose" @confirm="handleConfirm" />
    <step-5 :visible="state.active===5" @close="handleClose" @confirm="handleConfirm" />
  </div>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, watch } from 'vue'
import Speed from './speed.vue'
import ConfirmId from './confirm-id.vue'
import ConfirmBet from './confirm-bet.vue'
import Waiting from './wait-confirm.vue'
import Submit from './submit.vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    'step-1': Speed,
    'step-2': ConfirmId,
    'step-3': ConfirmBet,
    'step-4': Waiting,
    'step-5': Submit
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  emits: ['update:visible'],
  setup(props, {emit}) {
    const state = reactive({
      visible: props.visible,
      active: 0
    })
    watch(() => props.visible, (n) => {
      state.visible = n
    }, {
      immediate: true
    })

    watch(() => state.visible, (n) => {
      const v = n ?? '-1'
      console.log('==', v);
      if (v !== '-1') {
        if (n) {
          $('.TCB1').fadeIn(100);
          state.active = 1
        } else {
          state.active = 0
          $('.TCB1').fadeOut(100);
        }
        console.log(state.active);
        nextTick(() => {
          emit('update:visible', n)
        })
      }
    })

    const handleClose = () => {
      state.active = 0
      state.visible = false
    }

    const handleConfirm = () => {
      if (state.active < 5) {
        state.active++
      } else {
        message.info('submit')
        setTimeout(() => {
          state.visible = false
          state.active = 0
        }, 1000)
      }
    }

    return {
      state,
      handleClose,
      handleConfirm
    }
  }
})
</script>