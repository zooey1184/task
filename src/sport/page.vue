<template>
  <Layout :slideOptions="getCompetitionName">
    <div class="wrap">
      <router-view />
    </div>
    <template #bet>
      <RightSider />
    </template>
  </Layout>
</template>

<script>
import {
  defineComponent,
  ref,
  provide,
  computed,
  watch,
  reactive,
  onMounted,
  inject,
} from "vue";
import Header from "./components/header.vue";
import LeftSider from "./components/left-sider.vue";
import RightSider from "./components/right-sider/index.vue";
import Content from "./components/content.vue";
import WalletPane from "./components/wallet-pane.vue";
import MNav from "./components/m-nav.vue";
import InitProvider from "./components/init-provider.vue";
// import { getSportTournament } from "./apis";
import { message } from "ant-design-vue";
import BetModal from "./components/transaction";
import Layout from "@/sport/layout";

export default defineComponent({
  components: {
    Header,
    LeftSider,
    RightSider,
    Content,
    WalletPane,
    MNav,
    InitProvider,
    BetModal,
    Layout,
  },
  props: {},
  setup(props) {
    const headerRef = ref();
    const state = reactive({
      walletVisible: false,
      active: "", // footer , baskatball ...,
      sports: [],
      sportItemList: [],
      schedule: undefined,
      scheduleList: [],
      visible: false,
    });

    const SPORTS = inject("SPORTS");
    const SPORT_BET = inject("SPORT_BET");
    const methods = inject("methods");
    const SPORTS_ITEM_LIST = inject("SPORTS_ITEM_LIST");

    watch(
      () => SPORTS?.value,
      (n) => {
        console.log(n);
        if (n?.length) {
          state.sports = n;
          state.active = n[0].id;
        }
      }
    );
    watch(
      () => SPORTS_ITEM_LIST.value,
      (n) => {
        if (n?.length) {
          state.sportItemList = n;
        }
      }
    );

    const getSportBetList = computed(() => {
      return SPORT_BET.getBetList.value;
    });

    watch(
      () => getSportBetList.value,
      (n, o) => {
        if (n?.length && !o?.length) {
          state.visible = true;
        }
      }
    );

    watch(
      () => state.active,
      (n) => {
        if (n === "website") {
          // window.open('')
          message.info("这个是要跳转的链接");
        } else {
          methods.handleGetSportItemList(n);
        }
      }
    );

    watch(
      () => state.schedule,
      (n) => {
        // getSportTournament(n, {
        //   // scheduled: '2022-06-11',
        //   status: "not_started",
        // }).then((res) => {
        //   if (res.data) {
        //     state.scheduleList = res.data;
        //   }
        // });
      }
    );
    const getSchedule = computed(() => state.schedule);
    const getScheduleItem = computed(() => {
      const val = state.schedule;
      const list = state.sportItemList;
      const item = list.find((ii) => ii.id === val);
      return item;
    });
    const getScheduleList = computed(() => state.scheduleList);

    provide("SCHEDULE", {
      getSchedule,
      getScheduleList,
      getScheduleItem,
    });

    const handleWalletVisible = () => {
      state.walletVisible = true;
    };

    const COMPETITION_NAME = inject("COMPETITION_NAME", {
      value: [],
    });
    const getCompetitionName = computed(() => COMPETITION_NAME.value);
    return {
      state,
      headerRef,
      handleWalletVisible,
      getCompetitionName,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  // color: #fff;
  // top: 0;
  position: relative;
  // width: 100%;
  // padding: 0 10% 0;
  // height: calc(100vh - 80px);
  // top: 80px;
  // overflow: auto;
  // overflow-x: hidden;
  // @media (min-width: 960px) and (max-width: 1440px) {
  //   height: calc(100vh - 70px);
  //   top: 70px;
  // }
  // @media (max-width: 960px) {
  //   height: calc(100vh - 60px);
  //   top: 60px;
  // }
  // @media (max-width: 639px) {
  //   height: calc(100vh - 0.42rem);
  //   top: 0.42rem;
  // }
}
</style>
