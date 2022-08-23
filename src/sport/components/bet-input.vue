<template>
  <div class="flex items-center justify-between" style="height: 32px">
    <div>
      <slot name='title'></slot>
    </div>
    <div v-if='showInput'>
      <input class="bet-input" type='number' ref='inputRef' placeholder="Your bet" @focus="handleFocus" @blur="handleBlur" v-model='state.value' />  
    </div>
  </div>
  <slot name='desc'></slot>

  <div class="collapse-wrap flex items-center justify-between" :class="{'collapse-show': state.visible}">
    <template v-for="(item, index) in options" :key='index'>
      <div class="collapse-item" :class="{'gutter': index !== 0, 'active': state.value === item.value}" @focus="handleFocus" @blur="handleBlur" :tabindex="index" @click="handlePickItem(item)" >
        {{item.label}}
      </div>
    </template>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  components: {},
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array,
      default: () => ([
        {
          label: '1000',
          value: '1000'
        },
        {
          label: '2000',
          value: '2000'
        },
        {
          label: '2500',
          value: '2500'
        }
      ])
    },
    showInput: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value', 'change'],
  setup(props, {emit}) {
    const inputRef = ref()
    const state = reactive({
      value: props.value,
      visible: false,
      isPickItem: false
    })

    watch(() => props.value, (n) => {
      state.value = n
    }, {
      immediate: true
    })

    watch(() => state.value, (n) => {
      emit('update:value', n)
      
    })

    const handleFocus = () => {
      state.isPickItem = true
      if (props.options?.length) {
        state.visible = true
      }
    }

    const handlePickItem  = (item) => {
      state.isPickItem = true
      state.value = item.value
      inputRef.value?.focus()
    }

    const handleBlur = () => {
      if (parseInt(state.value) < 0) {
        message.warning('Amount must be greater than 0')
        state.value = ''
      }
      state.visible = false
    }

    return {
      state,
      inputRef,
      handleBlur,
      handleFocus,
      handlePickItem
    }
  }
})
</script>

<style lang="less" scoped>
.collapse-wrap {
  overflow: hidden;
  position: relative;
  max-height: 0;
  transition: all 200ms linear;
}
.collapse-item {
  height: 32px;
  text-align: center;
  background: #303b47;
  color: #fff;
  margin-top: 6px;
  line-height: 32px;
  font-weight: 500;
  font-size: 14px;
  flex-grow: 1;
  cursor: pointer;
  border: 1px solid #303b47;
  border-radius: 4px;
}
.gutter {
  margin-left: 4px;
}
.collapse-show {
  max-height: 38px;
}
.bet-input {
  background: #303b47;
  color: #fff;
  // border: none;
  border: 1px solid #303b47;
  height: 32px;
  border-radius: 4px;
  outline: none;
  text-align: center;
  width: 75px;
  font-weight: 600;
  font-size: 14px;
  transition: all 100ms linear;
  &:hover {
    border: 1px solid #26baf07e;
  }
  &:focus {
    border: 1px solid #16bdf9;
  }
}

</style>