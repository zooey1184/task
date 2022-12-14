<template>
  <Container
    class="containerWrap scrollbar"
    group-name="cols"
    tag="div"
    orientation="horizontal"
    @drop="onColumnDrop($event)">
    <Draggable
      v-for="column in state.scene.children" :key="column.id">
      <div class="dragPane flex flex-col">

        <!-- header-->
        <div class="header ">
          <span >{{ column.name }}</span>
        </div>
        <!-- column -->
        <Container
          class="container scrollbar"
          orientation="vertical"
          group-name="col-items"
          :shouldAcceptDrop="(e, payload) =>  (e.groupName === 'col-items' && !payload.loading)"
          :get-child-payload="getCardPayload(column.id)"
          :drop-placeholder="{ className: 
            `bg-blue-20  m-9`, 
          animationDuration: '200', 
          showOnTop: true }"
          drag-class="drag"
          drop-class="drop"
          @drop="(e) => onCardDrop(column.id, e)">

            <!-- Items -->
            <KanbanItem v-for="item in column.children" :key="item.id" :item="item"></KanbanItem>
        </Container>
      </div>
    </Draggable>
  </Container>
</template>



<script>
import {reactive, defineComponent} from 'vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems, generateWords } from './utils'
import KanbanItem from './kanItem.vue'

// mock
const scene = {
  type: 'container',
  props: {
    orientation: 'horizontal'
  },
  children: generateItems(8, i => ({
    id: `column${i}`,
    type: 'container',
    name: generateWords(Math.random() * 2 + 1),
    props: {
      orientation: 'vertical',
    },
    children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
      type: 'draggable',
      id: `${i}${j}`,
      loading: false,
      data: generateWords(Math.random() * 12 + 2)
    }))
  }))
}

export default defineComponent({
  components: { Container, Draggable, KanbanItem },
  setup() {
    const state = reactive({
      scene,
    })

    const getColumnHeightPx = () => {
      let kanban = document.getElementById('kanbanContainer');
      return kanban ? kanban.offsetHeight - 122 : 0;
    }
    const onColumnDrop =  (dropResult) => {
      const scene = Object.assign({}, state.scene)
      scene.children = applyDrag(scene.children, dropResult)
      state.scene = scene
    }
    const onCardDrop = (columnId, dropResult) => {
      
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        
        const scene = Object.assign({}, state.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const itemIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        
        // check if element was ADDED in current column
        if((dropResult.removedIndex == null && dropResult.addedIndex >= 0)){
          // your action / api call
          dropResult.payload.loading = true
          // simulate api call
          setTimeout(function(){ dropResult.payload.loading = false }, (Math.random() * 5000) + 1000); 
        }
        
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(itemIndex, 1, newColumn)
        state.scene = scene
      }
    }
    const getCardPayload = (columnId) => {
      return index => {
        return state.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    }

    return {
      state,
      scene,
      getCardPayload,
      onCardDrop,
      getColumnHeightPx,
      onColumnDrop
    }
  }
})
</script>


<style lang="less" scoped>
.smooth-dnd-container.horizontal{
  display: flex !important;
}

.containerWrap {
  height: calc(100vh - 100px);
  display: flex;
  overflow-x: auto;
  margin: 8px;
  padding: 8px;
}
.dragPane {
  background: #eee;
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 0 10px #eee;
  width: 384px;
  margin-right: 16px;
  height: calc(100vh - 100px);
}
.header {
  padding: 16px;
  cursor: move;
  background: #8B5CF6;
}
.container {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.drop {
  transition: all 200ms ease-in;
  scale: 0.9;
}
</style>

<style lang="less">
.drag {
  background: #8B5CF6 !important;
  border: 2px solid #eee;
  transition: all 100ms linear;
  color: #fff;
  transform: rotate(6deg);
  scale: 1.1;
}
</style>
