<template>
  <div class="imgBg"></div>
  <div class="wrapPane">
    <TopPane :address="state.detail.address" :time="state.detail.startTime" />
    <VsPane
      v-if="state.detail.selections"
      :time="state.detail.startTime"
      :oddsId="state.detail.oddsId"
      :homeInfo="state.detail?.selections?.find((item) => item.type === 'home')"
      :awayInfo="state.detail?.selections?.find((item) => item.type === 'away')"
    />

    <div class="tab-pane" style="margin-top: 16px">
      <a-tabs>
        <a-tab-pane key="0" tab="全部">
          <div v-if="state.list?.length">
            <template v-for="item in state.list" :key="item.id">
              <div class="mb-16">
                <Item
                  :name="item.name"
                  :oddsId="item.id"
                  :homeInfo="
                    item.selections?.find((item) => item.type === 'home')
                  "
                  :awayInfo="
                    item.selections?.find((item) => item.type === 'away')
                  "
                />
              </div>
            </template>
          </div>
        </a-tab-pane>

        <!-- <a-tab-pane key="1" tab="让分投注">
          <Item />
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  onMounted,
  onActivated,
  reactive,
  computed,
} from "vue";
import TopPane from "./top-pane.vue";
import VsPane from "./vs-pane.vue";
import { Tabs } from "ant-design-vue";
import Item from "./item";
import { getMatchOdds } from "@/sport/api/index";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    TopPane,
    VsPane,
    Item,
    "a-tabs": Tabs,
    "a-tab-pane": Tabs.TabPane,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      list: [],
      detail: {},
    });
    const getDetail = () => {
      const { query } = router.currentRoute.value;
      getMatchOdds(query.id).then((res) => {
        console.log(res);
        state.list = res.map((item) => {
          item.oddsId = item.id;
          return item;
        });
      });
    };

    const init = () => {
      getDetail();
      const sportDetailJSON = window.sessionStorage.getItem("sportDetail");
      try {
        if (sportDetailJSON?.length) {
          state.detail = JSON.parse(sportDetailJSON);
        }
      } catch (e) {
        console.log(e);
      }
    };

    onActivated(() => {
      init();
    });

    onMounted(() => {
      init();
    });

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  min-width: 1000px;
  object-fit: cover;
  object-position: center;
}
.wrapPane {
  // width: 80%;
  // margin: 0 auto;

  // @media (min-width: 960px) and (max-width: 1440px) {
  //   width: 90%;
  // }
  // @media (max-width: 960px) {
  //   width: 98%;
  // }
  padding: 16px 24px;
}
.imgBg {
  background: url("../../images/imgBg.png");
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
:deep(.tab-pane) .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
  color: transparent;
  background-image: linear-gradient(
    to right,
    var(--primary-main),
    var(--primary-sub)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
:deep(.tab-pane) .ant-tabs-tab-btn {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
:deep(.tab-pane) .ant-tabs-ink-bar {
  background-image: linear-gradient(
    to right,
    var(--primary-main),
    var(--primary-sub)
  );
  height: 4px;
}
</style>
