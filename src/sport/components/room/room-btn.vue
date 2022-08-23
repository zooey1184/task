<template>
  <div class="start ml-24 ff" v-if="!isLink" @click="handleConnect">
    START THE GAME
  </div>

  <div class="start ml-24" v-if="isLink">
    <div v-if="getCode" class="flex items-center">
      <Icon>
        <template #component="svgProps">
          <svg
            t="1659105446797"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16832"
            width="128"
            height="128"
            v-bind="svgProps"
          >
            <path
              d="M448 456V96q0-12.992 9.504-22.496T480 64h192q14.016 0 23.008 8.992T704 96t-8.992 23.008T672 128h-160v128h160q14.016 0 23.008 8.992T704 288t-8.992 23.008T672 320h-160v128q104 2.016 175.008 69.504t80 170.496q4 104-58.496 179.488T544 957.984q-104 11.008-183.008-46.496T260 752q-16.992-102.016 35.488-184.992T448 456zM512 896q82.016-2.016 136-56T704 704q-2.016-82.016-56-136T512 512q-82.016 2.016-136 56T320 704q2.016 82.016 56 136T512 896z"
              p-id="16833"
            ></path>
          </svg>
        </template>
      </Icon>
      <span @click="handleCloseCasino">{{ getCode }}</span>
      <Copy :text="getCode" id="room" />
      <!-- <span class="mx-8">|</span>
      <span class="cursor-pointer" @click="handleSwitch"
        >SWITCH<QuestionCircleOutlined
      /></span> -->
    </div>

    <div v-else @click="handleInRoom">JOIN ROOM</div>
  </div>

  <Mask v-model:visible="state.visible">
    <div>
      <RoomInit
        v-if="state.status === 'init'"
        :type="state.type"
        @next="state.status = 'confirmCreate'"
        @ok="state.visible = false"
      />
      <RoomConfrimCreate
        v-if="state.status === 'confirmCreate'"
        @next="handleNextConfirmCreate"
      />
      <RoomSubmitIng v-if="state.status === 'submit'" @close="handleClose" />
      <PoolPane v-if="state.status === 'close'" @ok="handleClose" />
      <!-- <UnableSwitch /> -->
    </div>
  </Mask>
</template>

<script>
import { defineComponent, reactive, computed, inject, onMounted } from "vue";
import Mask from "@/sport/components/mask";
import RoomInit from "./init-modal.vue";
import RoomConfirmId from "./confirm-id.vue";
import RoomConfrimCreate from "./confirm-create.vue";
import RoomSubmitIng from "./submit-ing.vue";
import RoomPool from "./pool-pane.vue";
import WaitConfirm from "./wait-confirm.vue";
import IntoRoom from "./into-room.vue";
import UnableSwitch from "./unable-switch.vue";
import Icon, { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { message, Typography } from "ant-design-vue";
import Copy from "@/sport/components/copy";
import PoolPane from "./pool-pane.vue";

export default defineComponent({
  components: {
    Mask,
    RoomInit,
    RoomConfirmId,
    RoomConfrimCreate,
    RoomSubmitIng,
    RoomPool,
    WaitConfirm,
    IntoRoom,
    UnableSwitch,
    Icon,
    Copy,
    QuestionCircleOutlined,
    PoolPane,
  },
  emits: ["init"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      status: "init",
      type: "create",
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const ROOM = inject("ROOM");
    const getCode = computed(() => ROOM.code.value);
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const handleConnect = () => {
      ACCOUNTS.link();
    };

    const getStatus = computed(() => {
      if (getCode.value) {
        return "in-room";
      }
      return "init";
    });

    const handleInRoom = () => {
      if (!getCode?.value) {
        state.type = "create";
        state.status = "init";
        state.visible = true;
      }
    };

    const handleSwitch = () => {
      state.type = "other";
      state.status = "init";
      state.visible = true;
    };

    const handleNextConfirmCreate = () => {
      state.status = "submit";
      ROOM.handleGetCode();
    };

    const handleClose = () => {
      state.visible = false;
      ROOM.handleGetCode();
    };

    const handleCloseCasino = () => {
      const roomAddress = ROOM.roomAddress.value;
      const id = ACCOUNTS.accounts.value[0];

      if (id === roomAddress) {
        state.status = "close";
        state.visible = true;
      }
    };

    const testfn = () => {
      state.status = "confirmCreate";
      state.visible = true;
    };

    return {
      state,
      isLink,
      handleConnect,
      handleInRoom,
      getCode,
      getStatus,
      handleSwitch,
      testfn,
      handleClose,
      handleNextConfirmCreate,
      handleCloseCasino,
    };
  },
});
</script>

<style lang="less" scoped>
.start {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 0 10px #ff0083;
  background-color: #ff008479;
  border-color: #ff0083 !important;
  border: 1px solid;
  color: #fff;
  animation: shane 2000ms linear infinite;
  &:hover {
    cursor: pointer;
    background: #ff0083 !important;
  }
}
@keyframes shane {
  0% {
    background-color: #ff00843d;
  }
  50% {
    background-color: #ff00848b;
  }
  100% {
    background-color: #ff00843d;
  }
}
</style>
