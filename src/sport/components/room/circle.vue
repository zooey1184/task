<template>
  <div class="pos-r flex items-center justify-center" style="width: 100%">
    <div class="pos-r">
      <Progress
        type="circle"
        :stroke-color="{
          '0%': '#ba77f3',
          '100%': '#346cf8'
        }"
        trailColor="#3b3b5b"
        :strokeWidth="2"
        :percent="state.percent"
        :format="() => ''"
        :width="160"
      ></Progress>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { reactive, defineComponent, computed, onMounted } from 'vue'
  import {Progress} from 'ant-design-vue'

  export default defineComponent({
    components: {
      Progress,
    },
    props: {
      duration: {
        type: Number,
        default: 10000
      }
    },
    emits: ['ok'],
    setup(props, {emit}) {
      const state = reactive({
        percent: 0,
        timer: undefined
      })

      const getStep = computed(() => {
        const tStep = props.duration/(1000*20)
        return tStep
      })

      const addPercent = (t) => {
        if (state.percent<=100) {
          state.timer = setTimeout(() => {
            state.percent += getStep.value
            addPercent(t)
          }, 50)
        } else {
          t--
          if (t <= 0) {
            clearTimeout(state.timer)
            state.timer = null
          } else {
            state.percent = 0
            addPercent(t)
          }
          
        }
      }

      onMounted(() => {
        addPercent(10)
      })

      return {
        state
      }
    }
  })
</script>
