<template>
  <div class="content Tc-DDQR Huans" v-if='state.visible'>
		<a href="JavaScript:;" @click="handleClose" class="Tclose zYQclose"></a>
		<div class="zyqTcNT flexC"><p>Waiting for confirmation</p></div>
		<div class="XYQR flexC">
			<div class="XYQRI"><img src="../../images/zyq0425/zyqTcN03.png"></div>
			<div class="XYQRP">waiting for confirmation<br>预估以xxx 赔率 投注 xxx USDT<br>confirm this transaction in your wallet</div>
		</div>
		<a href="JavaScript:;" class="zyqTcB IndBac1 zyqTcB4" @click="handleConfirm">Sign request</a>
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
	max-width: 680px;
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