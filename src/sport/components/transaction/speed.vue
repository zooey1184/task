<template>
  <!-- class zyqTcN -->
  <div class="content Tc-MYJY Huans" v-if="state.visible">
    <a href="JavaScript:;" class="Tclose zYQclose" @click="handleClose"></a>
    <div class="zyqTcNT flexC">
      <p>Default transaction speed</p>
      <img src="../../images/zyq0425/wenhao.png" />
    </div>
    <div class="TcFqT flexC">
      <a
        href="JavaScript:;"
        v-for="item in state.speed"
        :class="{ IndBac1: state.speedValue === item.value }"
        class="zyqTcNTa Huans"
				@click='handlePickSpeed(item)'
        >{{item.label}}</a
      >
    </div>

    <div class="zyqTcNTs flexC">
      <p>Slippage tolerance</p>
      &nbsp;<img src="../../images/zyq0425/wenhao.png" />
    </div>
    <div class="TcFqT flexC">
      <a
        href="JavaScript:;"
        v-for="item in state.tolerance"
        :class="{ IndBac1: state.toleranceValue === item.value }"
        class="zyqTcNTa Huans"
				@click='handlePickTolerance(item)'
        >{{item.label}}</a
      >
    </div>
    <div class="zyqTcNT flexC">
      <p>Transaction cut-off time (minutes)</p>
      <img src="../../images/zyq0425/wenhao.png" />
    </div>
    <div class="TcFqT flexC">
      <a
        href="JavaScript:;"
        v-for="item in state.timeCut"
        :class="{ IndBac1: state.timeCutValue === item.value }"
        class="zyqTcNTa Huans"
				@click='handlePickTimeCut(item)'
        >{{item.label}}</a
      >
    </div>
    <div class="zyqTcB zyqTcB1 IndBac1 cursor-pointer" @click="handleConfirm">Confirm bet</div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from "vue";

export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ["update:visible", "close", "confirm"],
  setup(props, { emit }) {
    const state = reactive({
      visible: props.visible,
      // 响应速度
      speed: [
        {
          label: "Standard(1)",
          value: "1",
        },
        {
          label: "fast(5)",
          vlaue: "5",
        },
        {
          label: "instant(6)",
          value: "6",
        },
      ],
      speedValue: "1",
      // 滑动 =》 承受风险值
      tolerance: [
        {
          label: "5%",
          value: "5",
        },
        {
          label: "10%",
          value: "10",
        },
        {
          label: "20%",
          value: "20",
        },
      ],
      toleranceValue: "5",
      timeCut: [
        {
          label: "20",
          value: "20",
        },
      ],
      timeCutValue: "",
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
    const handleClose = () => {
      emit("close");
      state.visible = false;
    };
    const handleConfirm = () => {
      emit("confirm");
    };

		const handlePickSpeed = (item) => {
			if (state.speedValue !== item.value) {
				state.speedValue = item.value
			}
		}
		const handlePickTolerance = (item) => {
			if (state.toleranceValue != item.value) {
				state.toleranceValue = item.value
			}
		}
		const handlePickTimeCut = (item) => {
			if (state.timeCutValue !== item.value) {
				state.timeCutValue = item.value
			} else {
				state.timeCutValue = ''
			}
		}
    return {
      handleClose,
      handleConfirm,
			handlePickTolerance,
			handlePickSpeed,
			handlePickTimeCut,
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  width: 45%;
  min-width: 400px;
  max-width: 680px;
  position: fixed;
  z-index: 1000;
  background: #222245;
  left: 50%;
  top: 50%;
  color: #cbcbe4;
  transform: translate(-50%, -50%);
  padding: 15px 23px 45px;
  border-radius: 8px;
}
</style>
