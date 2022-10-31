<template>
  <Draggable v-if="item">
    <div class="itemWrap scrollbar">
      <div v-if="item.loading" class="flex space-x-2 bg-gray-50 text-gray-900 dark:text-gray-200 dark:bg-gray-900 px-4 py-2 rounded-t-lg">

        <span>Processing...</span>
      </div>
      <div class="p-4 space-y-2">
        <div class="rounded-lg bg-primary p-2 w-max h-max inline-block box-content  ">
          {{emoji}}
        </div>
      <p>{{ item.data }}</p>
      </div>
    </div>
  </Draggable>
</template>

<script>
import { getRandomEmoji } from './utils.js'
import { Draggable } from 'vue3-smooth-dnd'

export default {
  name: "KanbanItem",
  components: { Draggable },
  data(){ 
    return {
      emoji: getRandomEmoji()
    }
  },
  props: {
    item: Object,
  },
};
</script>


<style lang="less" scoped>
.itemWrap {
  cursor: move;
  margin: 2px 4px ;
  border-radius: 4px;
  box-shadow:  0 0 5px #eee;
  background: #eee;
}
</style>