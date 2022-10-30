<template>
  <div>
    <span>Studio Ghibli Tier List</span>
    <Container orientation="vertical" @drop="onDrop">
      <Draggable v-for="(item, i) in state.items" :key="item.id">
        <div class="paneItem">
          {{ item.data }}
        </div>
      </Draggable>

      <Draggable v-for="(item, i) in state.items2" :key="item.id">
        <div class="paneItem">
          {{ item.data }}
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { Container, Draggable } from "vue3-smooth-dnd";

export default defineComponent({
  components: { Container, Draggable },
  setup() {
    const state = reactive({
      items: [
        { id: 1, data: "Princess Mononoke" },
        { id: 2, data: "Spirited Away" },
        { id: 3, data: "My Neighbor Totoro" },
        { id: 4, data: "Howl's Moving Castle" },
      ],
      items2: [
        { id: 21, data: "Princess Mononoke2" },
        { id: 22, data: "Spirited Away2" },
        { id: 23, data: "My Neighbor Totoro2" },
        { id: 24, data: "Howl's Moving Castle2" },
      ],
    });

    const onDrop = (dropResult) => {
      state.items = applyDrag(state.items, dropResult);
    };
    const applyDrag = (arr, dragResult) => {
      const { removedIndex, addedIndex, payload } = dragResult;

      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    };

    return {
      onDrop,
      applyDrag,
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.paneItem {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
</style>
