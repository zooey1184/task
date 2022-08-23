<template>
  <article
    class="RightCn Huans"
    style="height: 100vh"
    :class="{ RightCO: !state.visible }"
  >
    <div class="RightHd flexC fl-bet Huans" v-if="isLink">
      <div class="RightHdI"><img src="../../images/zyq0425/pic01.jpg" /></div>
      <div class="RightHdN">
        <p>{{ getId }}</p>
        <div class="RightHdJ"></div>
      </div>
      <a
        href="javascript:;"
        class="RightHda RightHwa"
        @click="handleChangeWalletVisible"
      ></a>
    </div>
    <div v-if="!isLink" class="RightHd"></div>

    <div style="height: calc(100vh - 120px); overflow: auto">
      <div class="Rightit flex fl-bet">
        <a
          href="javascript:;"
          class="Rightita flexC fl-cen"
          @click="state.active = 0"
          :class="{ on: state.active === 0 }"
        >
          <i class="RightitI RightitI1"></i>
          <p>betting slip</p>
        </a>
        <a
          href="javascript:;"
          class="Rightita flexC fl-cen"
          @click="state.active = 1"
          :class="{ on: state.active === 1 }"
        >
          <i class="RightitI RightitI2"></i>
          <p>my bet</p>
        </a>
      </div>

      <div class="RighN" v-if="state.active === 0">
        <BetPane />
      </div>

      <div class="RighN" v-if="state.active === 1">
        <div class="RighNK Huans">
          <div class="RighNTit flexC fl-bet">
            <a
              href="javascript:;"
              class="RighNTita TRighNTita"
              :class="{ on: state.doneActive === 'undone' }"
              @click="state.doneActive = 'undone'"
            >
              Undone
            </a>
            <a
              href="javascript:;"
              class="RighNTita TRighNTita"
              :class="{ on: state.doneActive === 'completed' }"
              @click="state.doneActive = 'completed'"
            >
              Completed
            </a>
          </div>
          <div
            class="RighNZ TRighNZ Huans"
            style="max-height: calc(100vh - 340px); overflow: auto"
            v-if="state.doneActive === 'undone'"
          >
            <div class="RighKong flexC fl-cen">
              <div class="RighKongN">
                <img src="../../images/zyq0425/kongL.png" />
                <p>Not bet list is empty</p>
                <a href="javascript:;">Place a bet here to see your choices</a>
              </div>
            </div>
            <a href="javascript:;" class="RighA">See more</a>
          </div>
          <div
            class="RighNZ TRighNZ Huans"
            v-if="state.doneActive === 'completed'"
          >
            <div style="max-height: calc(100vh - 340px); overflow: auto">
              <div
                class="RighKong flexC fl-cen"
                v-if="!state.myBetList?.length"
              >
                <div class="RighKongN">
                  <img src="../../images/zyq0425/kongL.png" />
                  <p>Not bet list is empt</p>
                  <a href="javascript:;"
                    >Place a bet here to see your choices</a
                  >
                </div>
              </div>
              <div v-for="item in state.myBetList" class="betItem">
                {{ item.label }}
                <BetInput>
                  <template #title> title </template>
                </BetInput>
              </div>
            </div>
            <a href="javascript:;" class="RighA">See more</a>
          </div>
        </div>
      </div>
    </div>

    <div class="RightF flexC fl-bet">
      <div class="RightFN flexC fl-cen">
        <a href="javascript:;" class="RightFNI RightFNI1"></a>
        <a href="javascript:;" class="RightFNI RightFNI2"></a>
        <a href="javascript:;" class="RightFNI RightFNI3"></a>
        <a href="javascript:;" class="RightFNI RightFNI4"></a>
      </div>
      <a href="javascript:;" class="RightRe" @click="handleChangeVisible"></a>
    </div>
  </article>
</template>

<script>
import { defineComponent, inject, reactive, ref, computed, watch } from "vue";
import BetInput from "../bet-input.vue";
import BetItem from "../bet-item.vue";
import { Tooltip } from "ant-design-vue";
import { CloseSquareOutlined } from "@ant-design/icons-vue";
import DeleteIcon from "./icon-delete-all.vue";
import BetPane from "./bet-pane.vue";

export default defineComponent({
  components: {
    BetInput,
    BetItem,
    CloseSquareOutlined,
    DeleteIcon,
    Tooltip,
    BetPane,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ["walletVisible", "update:visible"],
  setup(props, { emit }) {
    const state = reactive({
      visible: props.visible,
      active: 0,
      slipActive: "single",
      doneActive: "undone",

      // TODO 投注的列表 历史 || 进行时
      myBetList: [
        {
          label: "myBetList",
          value: "12",
        },
      ],
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const SPORT_BET = inject("SPORT_BET");
    const BET = inject("BET");

    watch(
      () => props.visible,
      (n) => {
        state.visible = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.visible,
      (n) => {
        emit("update:visible", n);
      }
    );
    const getSportBetList = computed(() => SPORT_BET.getList.value);
    const getBetType = computed(() => {
      return BET.value?.betType;
    });

    const handleChangeBetType = (e) => {
      BET.value?.changeBetType(e);
    };
    const getId = computed(() => ACCOUNTS.accountHide.value);
    const isLink = computed(() => ACCOUNTS.isLink.value);

    const handleChangeVisible = () => {
      state.visible = !state.visible;
    };

    const handleChangeWalletVisible = () => {
      if (ACCOUNTS.isLink.value) {
        emit("walletVisible", true);
      } else {
        ACCOUNTS.link();
      }
    };

    const handleBet = () => {
      if (ACCOUNTS.isLink.value) {
        emit("bet");
      } else {
        ACCOUNTS.link();
      }
    };

    const handleDelete = () => {
      SPORT_BET.clear();
    };
    return {
      ACCOUNTS,
      state,
      getSportBetList,
      handleChangeVisible,
      handleChangeWalletVisible,
      handleBet,
      getId,
      getBetType,
      handleChangeBetType,
      handleDelete,
      isLink,
    };
  },
});
</script>

<style lang="less" scoped>
.betItem {
  // height: 50px;
  position: relative;
  font-size: 16px;
  margin-bottom: 8px;
}
.RighNTita {
  line-height: 28px !important;
}
.icon-delete {
  top: 4px;
  right: 4px;
  font-size: 18px;
  color: #6d819c;
}
</style>
