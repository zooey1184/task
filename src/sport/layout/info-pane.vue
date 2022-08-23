<template>
  <div class="h-100p overflow-auto">
    <div class="info-title active-bg mt-24 flex ff items-center">
      {{ accountHide }}
      <CopyIcon :text="getWalletAddress" />
    </div>
    <div class="m-8 p-8 primary-dark-bg rounded-4">
      <div class="pos-r">
        <div
          class="logoBg pos-a top-40"
          style="width: 200px; height: 230px; left: -8px"
        ></div>
      </div>
      <div class="flex items-center f5 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/eth.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          ETH
        </div>
        <div class="active-color">{{ getEth }}</div>
      </div>
      <div class="flex items-center f5 mt-16 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/USDT.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          USDT
        </div>
        <div class="active-color">{{ getUsdt }}</div>
      </div>
      <div class="flex items-center f5 mt-16 justify-between">
        <div class="flex items-center">
          <img
            src="../images/icons/USDT.png"
            class="mr-8"
            style="width: 14px"
            alt=""
          />
          BET
        </div>
        <div class="active-color">{{ getBet }}</div>
      </div>
      <div style="height: 30px"></div>
      <div class="pos-r" style="height: 55px">
        <div
          class="info-title active-bg ff flex items-center pos-a"
          style="left: -16px"
        >
          DASHBOARD
          <img
            style="width: 16px"
            class="ml-8"
            src="../images/icons/dashboard.png"
            alt=""
          />
        </div>
      </div>

      <div class="flex justify-between">
        <div class="info-itempane primary-bg">
          <div class="circle-wrap" style="margin: 0 auto">
            <img
              src="../images/v2/coin-icon-gray.png"
              style="width: 70px"
              alt=""
            />
          </div>
          <div class="flex items-center mt-8">
            <img
              src="../images/icons/doc.png"
              style="width: 12px; margin-right: 4px"
              alt=""
            />
            <div>{{ accountHide }}</div>
          </div>
          <div class="flex items-center mt-8">
            <img
              src="../images/icons/share.png"
              style="width: 12px; margin-right: 4px"
              alt=""
            />
          </div>
        </div>
        <div class="info-itempane flex-0 primary-bg">
          <div class="pos-r flex justify-center">
            <Progress
              type="circle"
              stroke-color="#ff0083"
              trailColor="#3b3b5b"
              :strokeWidth="5"
              :percent="state.percent"
              :format="() => ''"
              :width="80"
            ></Progress>
            <div
              class="pos-a"
              style="top: 54%; left: 50%; transform: translate(-50%, -50%)"
            >
              <img
                style="width: 36px"
                src="../images/icons/logo-red.png"
                alt=""
              />
              <p class="font-size-12 text-align-center active-color">
                {{ state.percent }}%
              </p>
            </div>
          </div>
          <div class="flex items-center mt-8">
            <img
              src="../images/icons/movie.png"
              style="width: 12px; margin-right: 4px"
              alt=""
            />
            <div class="flex justify-between flex-wrap flex-1">
              Total bet
              <span class="active-color">{{ getTotalBet }}</span>
            </div>
          </div>
          <div class="flex items-center mt-8">
            <img
              src="../images/icons/win.png"
              style="width: 12px; margin-right: 4px"
              alt=""
            />
            <div class="flex justify-between flex-wrap flex-1">
              Bets won
              <span class="active-color">{{ getTotalWin }}</span>
            </div>
          </div>
        </div>
      </div>

      <div style="height: 30px"></div>

      <div style="height: 55px" class="pos-r">
        <div
          class="info-title active-bg ff flex items-center pos-a"
          style="left: -16px"
        >
          BET REWARDS
          <img
            style="width: 13px; padding-bottom: 4px"
            class="ml-8"
            src="../images/icons/reward.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <div class="input-wrap flex items-center justify-between">
          <div class="input f4">0 USDT</div>
          <div class="btn-input ff">CLAIM</div>
        </div>
        <div class="ff active-color mt-8">REWARD DETAILS</div>
      </div>
    </div>

    <!-- <div class="info-title active-bg ff flex items-center" style="left: 0">
      DASHBOARD
      <img
        style="width: 16px"
        class="ml-8"
        src="../images/icons/dashboard.png"
        alt=""
      />
    </div>

    <div class="m-8 p-8 primary-dark-bg rounded-4 flex justify-between">
      <div class="info-itempane primary-bg">
        <div class="circle-wrap" style="margin: 0 auto">
          <img
            src="../images/v2/coin-icon-gray.png"
            style="width: 70px"
            alt=""
          />
        </div>
        <div class="flex items-center mt-8">
          <img
            src="../images/icons/doc.png"
            style="width: 12px; margin-right: 4px"
            alt=""
          />
          <div>{{ accountHide }}</div>
        </div>
        <div class="flex items-center mt-8">
          <img
            src="../images/icons/share.png"
            style="width: 12px; margin-right: 4px"
            alt=""
          />
        </div>
      </div>
      <div class="info-itempane flex-0 primary-bg">
        <div class="pos-r flex justify-center">
          <Progress
            type="circle"
            stroke-color="#ff0083"
            trailColor="#3b3b5b"
            :strokeWidth="5"
            :percent="state.percent"
            :format="() => ''"
            :width="80"
          ></Progress>
          <div
            class="pos-a"
            style="top: 54%; left: 50%; transform: translate(-50%, -50%)"
          >
            <img
              style="width: 36px"
              src="../images/icons/logo-red.png"
              alt=""
            />
            <p class="font-size-12 text-align-center active-color">
              {{ state.percent }}%
            </p>
          </div>
        </div>
        <div class="flex items-center mt-8">
          <img
            src="../images/icons/movie.png"
            style="width: 12px; margin-right: 4px"
            alt=""
          />
          <div class="flex justify-between flex-wrap flex-1">
            Total bet
            <span class="active-color">{{ getTotalBet }}</span>
          </div>
        </div>
        <div class="flex items-center mt-8">
          <img
            src="../images/icons/win.png"
            style="width: 12px; margin-right: 4px"
            alt=""
          />
          <div class="flex justify-between flex-wrap flex-1">
            Bets won
            <span class="active-color">{{ getTotalWin }}</span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import CopyIcon from "@/sport/components/copy";
import { Progress } from "ant-design-vue";

export default defineComponent({
  components: {
    CopyIcon,
    Progress,
  },
  props: {},
  setup(props) {
    const state = reactive({
      percent: 40,
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const RESULT = inject("RESULT");

    const accountHide = computed(() => ACCOUNTS.accountHide.value);
    const getWalletAddress = computed(() => ACCOUNTS.accounts.value?.[0]);
    const getEth = computed(() => ACCOUNTS.eth.value);
    const getBet = computed(() => ACCOUNTS.bet.value);
    const getUsdt = computed(() => ACCOUNTS.usdt.value);

    const getTotalBet = computed(() => RESULT?.totalBet?.value || 0);
    const getTotalWin = computed(() => RESULT?.totalWin?.value || 0);

    return {
      state,
      accountHide,
      getWalletAddress,
      getEth,
      getBet,
      getUsdt,
      getTotalBet,
      getTotalWin,
    };
  },
});
</script>

<style lang="less" scoped>
.info-title {
  width: 140px;
  padding: 8px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}
.info-itempane {
  height: 160px;
  border-radius: 4px;
  padding: 16px 8px;
  width: 49%;
  z-index: 1;
}
.circle-wrap {
  border-radius: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.input-wrap {
  background: #363652;
  border-radius: 4px;
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
.logoBg {
  background-image: url("../images/logobg.png");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.15;
  z-index: 0;
}
</style>
