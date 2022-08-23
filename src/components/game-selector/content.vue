<template>
  <div>
    <div class="flex">
      <div class="gw_pane overflow-auto w-20p flex-0" style="height: 50vh">
        <a-anchor v-for="item in options" :affix="false">
          <a-anchor-link :href="`#${item.key}`" :title="item.title" />
        </a-anchor>
      </div>

      <div class="game_pane flex-1 p-16 overflow-auto" style="height: 50vh">
        <div v-for="(item, index) in options">
          <div class="font-size-18 font-weight-600" :id="item.key">
            {{ item.title }}
          </div>

          <div class="flex flex-wrap" v-if="state.activeKey > index">
            <div style="width: 120px" v-for="ii in item.children">
              <a-checkbox>{{ ii.title }}</a-checkbox>
            </div>
          </div>
        </div>
      </div>

      <div class="selected_pane w-20p flex-0 bg-blue-10"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "vue";
import { useTreeMap } from "@/components/tree";

export default defineComponent({
  components: {},
  props: {
    options: {
      type: Array,
    },
  },
  setup(props) {
    const state = reactive({
      activeKey: 0,
      timer: null,
    });

    const handleLoop = () => {
      state.activeKey++;
      state.timer = setTimeout(() => {
        if (state.activeKey < props.options?.length) {
          handleLoop();
        } else {
          clearTimeout(state.timer);
          state.timer = null;
        }
      });
    };

    onMounted(() => {
      handleLoop();
    });

    return {
      state,
    };
  },
});
</script>
