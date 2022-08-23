<template>
  <div>
    <BetTab v-model:active="state.active"></BetTab>
    <div>
      <BetPane v-if="state.active === 'bet'" />
      <MyBet v-if="state.active === 'mybet'" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import BetTab from "./bet-tab.vue";
import BetPane from "./bet-pane.vue";
import MyBet from "./my-bet.vue";

export default defineComponent({
  components: {
    BetTab,
    BetPane,
    MyBet,
  },
  props: {},
  setup(props) {
    const state = reactive({
      active: "bet",
    });

    return {
      state,
    };
  },
});
</script>
