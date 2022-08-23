<template>
  <div class="content Tc-QDTZ Huans" v-if='state.visible'>
		<a href="JavaScript:;" @click="handleClose" class="Tclose zYQclose"></a>
		<div class="zyqTcNT flexC"><p>Confirm bet</p></div>
		<div class="QDTZT">
			<div class="QDTZT-H">投注金额</div>
			<div class="QDTZT-p flexC">$10000<span>（USDT）</span></div>
		</div>
		<div class="QDTZ-N Huans">
			<div class="QDTZ-NT flexC"><img src="../../images/zyq0425/zyqTcN05.png"><p>2022-03-27  15:00</p></div>
			<div class="QDTZ-NH">China 3:0 France</div>
			<div class="QDTZ-Ns QDTZ-NC">PSG.LGD VS Team</div>
			<div class="QDTZ-Nr">
				<div class="QDTZ-NrP flexC fl-bet">
					<p>Bet amount：</p>
					<p>$100000</p>
				</div>
				<div class="QDTZ-NrP flexC fl-bet">
					<p>Estimated odds：</p>
					<p>1.17</p>
				</div>
				<div class="QDTZ-NrP flexC fl-bet">
					<p>Estimated Winning Amount：</p>
					<p class="QDTZ-NC">117</p>
				</div>
			</div>
		</div>
		<div class="XYQRP">Odds will be estimated. You will bet at odds as low as XX (related to slippage) and as high as XX. The minimum win is XXX, if the slippage range is exceeded, the bet will be automatically cancelled</div>
		<a href="JavaScript:;" class="zyqTcB IndBac1 zyqTcB3" @click='handleConfirm'>Confirm bet</a>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
	components: {},
	props: {
		visible: {
			type: Boolean
		}
	},
	emits: ['update:visible', 'close', 'confirm'],
	setup(props, {emit}) {
		const state = reactive({
			visible: props.visible
		})
		watch(() => props.visible, (n) => {
			state.visible = n
		}, {
			immediate: true
		})
		watch(() => state.visible, (n) => {
			emit('update:visible', n)
		})
		const handleClose = () => {
			emit('close')
			state.visible = false
		}
		const handleConfirm = () => {
			emit('confirm')
		}
		return {
			handleClose,
			handleConfirm,
			state
		}
	}
})
</script>

<style lang="less" scoped>
.content {
	width: 45%;
	min-width: 400px;
	max-width: 600px;
	position:fixed;
	z-index:1000;
	background:#222245;
	left:50%;
	top:50%;
	color:#cbcbe4;
	transform: translate(-50%,-50%); 
	padding:15px 23px 45px;
	border-radius:8px;
}
</style>