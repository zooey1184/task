<template>
  <header class="zyqhd flexC Huans">
    <div class="flex items-center justify-between flex-1">
      <a href="javascript:;" class="zyqlogo flexC">
        <img src="../images/zyq0425/logo.png" />
      </a>

      <HeaderRoomBtn @init="handleShowMask" />
    </div>
  </header>
  <Mask v-model:visible="state.visible">
    <div>
      <RoomInit />
    </div>
  </Mask>
</template>

<script>
import { defineComponent, reactive } from "vue";
import HeaderRoomBtn from "./header-room-btn.vue";
import Mask from "@/sport/components/mask";
import RoomInit from "./room/init-modal.vue";
import RoomConfirmId from "./room/confirm-id.vue";
import RoomConfrimCreate from "./room/confirm-create.vue";
import RoomSubmitIng from "./room/submit-ing.vue";
import RoomPool from "./room/pool-pane.vue";

export default defineComponent({
  components: {
    HeaderRoomBtn,
    Mask,
    RoomInit,
    RoomConfirmId,
  },
  props: {},
  setup(props) {
    const state = reactive({
      visible: false,
    });

    const handleShowMask = () => {
      state.visible = true;
    };

    return {
      state,
      handleShowMask,
    };
  },
});
</script>
