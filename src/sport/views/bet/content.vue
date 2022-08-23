<template>
  <section class="Inddan">
    <div style="margin-bottom: 35px" class="flex items-center">
      <div class="select-wrap active-border flex items-center">
        <div
          @click="handlePick('0')"
          class="item"
          :class="{ sactive: state.act === '0' }"
        >
          Rewards
        </div>
        <div
          @click="handlePick('1')"
          class="item"
          :class="{ sactive: state.act === '1' }"
        >
          Staking
        </div>
      </div>
    </div>
    <div class="Huans flex fl-bet">
      <div class="InddanN wow slideInUp" data-wow-duration="1s">
        <div class="desc">Total amount of your BET</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>70</span>
            <div style="line-height: 1.5">832</div>
          </div>
          <div class="InddanD f1">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.4s">
        <div class="desc">Total amount of your pool has been BET</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>70</span>
            <div style="line-height: 1.5">832</div>
          </div>
          <div class="InddanD f1">usdt</div>
        </div>
      </div>
      <div class="InddanN wow slideInUp" data-wow-duration="1.8s">
        <div class="desc">Remaining BET</div>
        <div class="InddanB flexE">
          <div class="InddanZ ff flex items-end insetTitle active-color">
            <span>70</span>
            <div style="line-height: 1.5">832</div>
          </div>
          <div class="InddanD f1">usdt</div>
        </div>
      </div>
    </div>

    <div class="gray-9">
      <div>BET Token available per bet of 1USDT this round: 0.8</div>
      <div>
        BET Token available for each USDT bet in the pool this round: 0.2
      </div>
    </div>

    <div style="margin-top: 50px">
      <div style="margin-bottom: 8px">BET Rewards</div>

      <div class="wrap">
        <!-- <div class="flex items-center justify-end">
          这是什么
          <Popover>
            <template #content>
              <p>Bet 奖励说明</p>
            </template>
            <question-circle-outlined
              style="font-size: 16px; margin-left: 4px"
            />
          </Popover>
        </div> -->
        <div class="input-wrap flex items-center justify-between">
          <div class="input">0 USDT</div>
          <div class="btn-input">CLAIM</div>
        </div>

        <div class="mb-16 mt-8 font-size-12">
          Unified claim will be opened soon
        </div>
        <div class="flex items-center gray-5 justify-between">
          <div>Total Reward:</div>
          <div class="f5 color-white">USDT 0.0</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { Popover } from "ant-design-vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    Popover,
  },
  setup() {
    const state = reactive({
      act: "0",
    });
    const handlePick = (act) => {
      state.act = act;
    };

    return {
      state,
      handlePick,
    };
  },
});
</script>

<style lang="less" scoped>
.desc {
  font-size: 16px;
  color: #fcfcfc;
  line-height: 1.2;
  height: 32px;
  color: #545472;
}
.insetTitle {
  line-height: 140px;
  @media (min-width: 960px) and(max-width: 1560px) {
    line-height: 110px;
  }
  @media (min-width: 640px) and(max-width: 960px) {
    line-height: 80px;
  }
  @media (min-width: 480px) and(max-width: 640px) {
    line-height: 60px;
  }
  @media screen and (max-width: 480px) {
    line-height: 60px;
  }
}
.select-wrap {
  border-radius: 4px;
}
.item {
  width: 120px;
  height: 32px;
  color: #999;
  font-size: 15px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}
.sactive {
  background: var(--primary-main);
  color: #fff;
}

.wrap {
  border-radius: 4px;
  padding: 16px;
  width: 380px;
  background: #24253b;
  color: #8889a0;
  @media screen and (max-width: 420px) {
    width: 100%;
  }
}

.gray {
  color: #617199;
}
.grey {
  color: #849ebf;
}
.gray-9 {
  color: #98a8d2;
}
.gray-9d {
  color: #9d9ec1;
}
.input-wrap {
  background: #363652;
  border-radius: 4px;
  margin-top: 12px;
  overflow: hidden;
}
.input {
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
.btn-input {
  background: #545472;
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  color: #fff;
}
</style>
