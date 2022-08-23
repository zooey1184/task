<template>
  <a-spin :spinning="state.loading" :delay="500">
    <slot></slot>
  </a-spin>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
} from "vue";
// import { getSports, getSportList } from "../apis";
import {getSportList} from '@/sport/api'
import { Spin } from "ant-design-vue";
import { queryCompetitionName, queryMatches } from "@/sport/api/index.js";

export default defineComponent({
  components: {
    "a-spin": Spin,
  },
  setup(props) {
    const state = reactive({
      sportsList: [],
      sportsItemList: [],
      loading: false,
      betType: "single",
      competitionList: [], // 举办方信息
      matchList: [], // 所有比赛
    });
    // const handleGetSports = async () => {
    //   const res = await getSports();
    //   const list = res.data;
    //   const _list = [];
    //   const icons = {
    //     footerball: "hdNavI1",
    //     足球: "hdNavI1",
    //     soccer: "hdNavI1",
    //     basketball: "hdNavI2",
    //     篮球: "hdNavI2",
    //     Esports: "hdNavI3",
    //     电竞: "hdNavI3",
    //   };
    //   list.forEach((item) => {
    //     _list.push({
    //       label: item.name,
    //       value: item.id,
    //       icon: icons[item.name] || "",
    //       ...item,
    //     });
    //   });
    //   state.sportsList = _list;
    // };
    const getSportsList = computed(() => {
      return [
        ...state.sportsList,
        {
          label: "official website",
          value: "website",
          icon: "hdNavI4",
        },
      ];
    });

    provide("SPORTS", getSportsList);

    const getSportItemListFn = async (id) => {
      state.loading = true;
      const data = await getSportList(id);
      state.loading = false;
      const _data = [];
      data.forEach((item) => {
        _data.push({
          ...item,
          label: item.name,
          value: item.id,
          icon: "LeftI1",
        });
      });
      state.sportsItemList = _data;
    };
    const getSportItemList = computed(() => state.sportsItemList);
    provide("SPORTS_ITEM_LIST", getSportItemList);

    provide("methods", {
      handleGetSportItemList: getSportItemListFn,
      setLoading: (e) => {
        state.loading = e;
      },
      betType: (e) => {
        if (typeof e === "undefined") {
          return state.betType;
        } else {
          state.betType = e;
        }
      },
    });

    // 投注方式
    const getBetType = computed(() => state.betType);
    const getBetInfo = computed(() => ({
      betType: state.betType,
      changeBetType: (e) => {
        state.betType = e;
      },
    }));
    provide("BET", getBetInfo);

    // 获取举办方信息
    const getCompetitionName = () => {
      queryCompetitionName().then((res) => {
        state.competitionList = res.map((item, index) => {
          item.label = item.competition_name;
          item.value = item.competition_name;
          item.icon = `LeftI${index + 1}`;
          return item;
        });
      });
      // state.competitionList = [
      //   {
      //     competition_name: "LPL Summer Cup",
      //     label: "LPL Summer Cup",
      //     icon: "LeftI3",
      //     value: "LPL Summer Cup",
      //     count: 10,
      //   },
      //   {
      //     competition_name: "LCK",
      //     label: "LCK",
      //     icon: "LeftI2",
      //     value: "LCK",
      //     count: 2,
      //   },
      // ];
    };

    const getCompetitionNameComputed = computed(() => {
      return state.competitionList;
    });

    provide("COMPETITION_NAME", getCompetitionNameComputed);

    const handleGetMatchList = () => {
      queryMatches().then((res) => {
        console.log(res);
        state.matchList = res;
      });
      // state.matchList = [
      //   {
      //     id: 3,
      //     name: "ThunderTalk Gaming vs OMG",
      //     isLive: 0,
      //     competition_name: "LPL Summer Cup",
      //     startTime: "2022-07-19T08:45:00.000Z",
      //     team_home_name: "ThunderTalk Gaming",
      //     team_away_name: "OMG",
      //     detailCount: 3,
      //     selections: [
      //       {
      //         id: 5370114,
      //         name: "ThunderTalk Gaming",
      //         status: 1,
      //         odds: 3,
      //         type: "home",
      //       },
      //       {
      //         id: 5370113,
      //         name: "OMG",
      //         status: 1,
      //         odds: 1.35,
      //         type: "away",
      //       },
      //     ],
      //     oddsId: 9,
      //   },
      //   {
      //     id: 4,
      //     name: "LNG Esports vs Ultra Prime",
      //     isLive: 0,
      //     competition_name: "LPL Summer Cup",
      //     startTime: "2022-07-19T11:00:00.000Z",
      //     team_home_name: "LNG Esports",
      //     team_away_name: "Ultra Prime",
      //     detailCount: 7,
      //     selections: [
      //       {
      //         id: 5370280,
      //         name: "LNG Esports",
      //         status: 1,
      //         odds: 1.35,
      //         type: "home",
      //       },
      //       {
      //         id: 5370281,
      //         name: "Ultra Prime",
      //         status: 1,
      //         odds: 3,
      //         type: "away",
      //       },
      //     ],
      //     oddsId: 12,
      //   },
      // ];
    };

    const getMatchList = computed(() => state.matchList);
    provide("MATCH_LIST", getMatchList);

    onMounted(() => {
      getCompetitionName();
      handleGetMatchList();
    });

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.body {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
