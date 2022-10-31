<template>
  <Icon>
    <template #component="svgProps">
      <svg
        t="1666925438739"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3912"
        width="32"
        height="32"
        v-bind='svgProps'
      >
        <path d="M368 0h32v1024h-32zM496 0h32v1024h-32zM624 0h32v1024h-32z" fill="" p-id="3913"></path>
      </svg>
    </template>
  </Icon>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  import Icon from '@ant-design/icons-vue'

  export default defineComponent({
    components: {
      Icon
    },
    props: {},
    setup() {
      const state = reactive({})

      return {
        state
      }
    }
  })
</script>
