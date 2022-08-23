<template>
  <div class="wallCn Huans" style="height: 100vh;" :class="{ wallCnO: state.visible }">
    <div>
      <div class="RightHd flexC fl-bet Huans">
        <div class="RightHdI"><img src="../images/zyq0425/pic01.jpg" /></div>
        <div class="RightHdN">
          <p>{{ getId }}</p>
          <div class="RightHdJ"></div>
        </div>
        <a
          href="javascript:;"
          class="RightHda close1"
          @click="state.visible = false"
        ></a>
      </div>
      
          <!-- Wallet -->
      <div class="wallCnK Huans" style="height: calc(100vh - 120px); overflow: auto; ">
        <div class="wallCnT flexC">
          <i class="wallCnTI wallCnTI1"></i>
          <p>Wallet</p>
          <a
            href="javascript:;"
            class="wallCnJ"
            :class="{ wallCnJO: !state.walletVisible }"
            @click="handleToggleWallet"
          ></a>
        </div>
        <div class="wallCnk" id="walletPane">
          <div class="navTit flexC fl-end">
            <div class="navTita Huans flexC fl-bet">
              <button
                class="btn"
                data-clipboard-action="copy"
                @click="handleCopy"
                data-clipboard-target="#target1"
                id="copy_btn1"
              ></button>
              <p id="target1">{{ getId }}</p>
              <img src="../images/navEit.png" />
              <div class="tips">Copy successful</div>
            </div>
          </div>
          <div class="navNR Huans">
            <div class="navNH flexC">
              <img src="../images/navI01.png" />
              <p>ETH</p>
              <div class="navNu">0.00</div>
            </div>
            <div class="navNH flexC">
              <img src="../images/zyq0425/ZRicon06.png" />
              <p>USDT</p>
              <div class="navNu">0.015</div>
            </div>
          </div>
        </div>
      
      
            <!-- 仪表盘 -->
        <div class="wallCnT flexC">
          <i class="wallCnTI wallCnTI2"></i>
          <p>仪表盘</p>
          <a 
            href="javascript:;"
            class="wallCnJ"
            :class="{ wallCnJO: !state.betVisible }"
            @click='handleBetVisible'
          />
        </div>
        <ul class="wallCnU wallCnk" id="betPane">
          <li>
            <div class="navNR Huans">
              <div class="wallYBP"><img src="../images/zyq0425/pic01.jpg" /></div>
              <div class="wallYBPz flexC fl-cen">
                <div class="navTita Huans flexC fl-bet">
                  <button
                    class="btn"
                    data-clipboard-action="copy"
                    data-clipboard-target="#target"
                        @click="handleCopy2"
                    id="copy_btn2"
                  ></button>
                  <p id="target">{{ getId }}</p>
                  <img src="../images/navEit.png" />
                  <div class="tips2">Copy successful</div>
                </div>
                <a href="javascript:;" class="wallYBPa"
                  ><img src="../images/zyq0425/ZRicon07.png"
                /></a>
              </div>
            </div>
          </li>
          <li>
            <div class="navNR Huans">
              <div class="navztz flexC fl-cen">
                <img src="../images/zyq0425/ZRicon09.png" />
                <p>41%</p>
              </div>
              <div class="navztzK flexC fl-cen">
                <div class="navztzN flexC fl-bet">
                  <img src="../images/zyq0425/ZRicon03.png" />
                  <p>Total bet</p>
                  <span>0</span>
                </div>
                <div class="navztzN flexC fl-bet">
                  <img src="../images/zyq0425/ZRicon04.png" />
                  <p>Bet won</p>
                  <span> 0（0%）</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <a href="javascript:;" class="wallCnBa Huans flexC close1" @click="handleDisLink">
			<img src="../images/zyq0425/ZRicon05.png" />
      <p>退出</p>
		</a>
  </div>
</template>

<script>
import { defineComponent, inject, reactive, ref, watch, computed, onMounted } from "vue";
import {Modal} from 'ant-design-vue'

export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const ACCOUNTS = inject("ACCOUNTS");
		const getId = computed(() => ACCOUNTS.accountHide.value)

    const state = reactive({
      clipboard1: undefined,
			clipboard2: undefined,
      visible: props.visible,
      walletVisible: true,
      betVisible: true,
    });

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

    watch(
      () => ACCOUNTS.accounts.value,
      (n) => {
        if (n?.length) {
          state.clipboard1 = new Clipboard("#copy_btn1", {
            text: () => n?.[0],
          });
					state.clipboard2 = new Clipboard("#copy_btn2", {
            text: () => n?.[0],
          });
        }
      },
			{
				immediate: true
			}
    );

    const handleToggleWallet = () => {
      if (state.walletVisible) {
        $("#walletPane").slideUp(400);
      } else {
        $("#walletPane").slideDown(400);
      }
      state.walletVisible = !state.walletVisible;
    };

		const handleBetVisible = () => {
			if (state.betVisible) {
        $("#betPane").slideUp(400);
      } else {
        $("#betPane").slideDown(400);
      }
      state.betVisible = !state.betVisible;
		}

    const handleCopy = () => {
      state.clipboard1.on("success", (e) => {
        $(".tips").show();
        setTimeout(function () {
          $(".tips").hide();
        }, 1000);
      });
    };
		const handleCopy2 = () => {
      state.clipboard2.on("success", (e) => {
        $(".tips2").show();
        setTimeout(function () {
          $(".tips2").hide();
        }, 1000);
      });
    };

    const handleDisLink = () => {
      Modal.confirm({
        title: 'Tip',
        content: 'Are you sure you want to exit?',
        onOk: () => {
          ACCOUNTS.disLink()
        }
      })
    }

		onMounted(() => {

		})

    return {
      ACCOUNTS,
			getId,
      handleCopy,
      state,
      handleToggleWallet,
			handleBetVisible,
			handleCopy2,
      handleDisLink,
    };
  },
});
</script>
