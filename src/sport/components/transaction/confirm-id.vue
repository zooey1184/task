<template>
	<!-- zyqTcN -->
  <div class="content Tc-XYQR Huans" v-if='state.visible'>
		<a href="JavaScript:;" @click="handleClose" class="Tclose zYQclose"></a>
		<div class="zyqTcNT flexC"><p>Need to confirm identity</p></div>
		<div class="XYQR flexC">
			<div class="pos-r flex items-center justify-center" style="width: 100%">
				<div class="pos-r">
					<a-progress
						type="circle"
						:stroke-color="{
							'0%': '#ba77f3',
							'100%': '#346cf8',
						}"
						trailColor='#3b3b5b'
						:strokeWidth='2'
						:percent="state.percent"
						:format='()=> ""'
						:width='160'>
							
					</a-progress>
					<img class="pos-a" style="top: 0; width: 160px; top: 0" src="../../images/zyq0425/zyqTcN01.png">
				</div>
			</div>
			<div class="XYQRP">You must go to the wallet to confirm the identity verification to confirm the bet</div>
			<a href="JavaScript:;" class="Tc-XYQRM flexC fl-cen zyqTcB2">
				<img class="spin" src="../../images/zyq0425/zyqTcNs.png">
				<p>Sign request</p>
			</a>
		</div>
	</div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
import {Progress} from 'ant-design-vue'
export default defineComponent({
	components: {
		'a-progress': Progress
	},
	props: {
		visible: {
			type: Boolean
		}
	},
	emits: ['update:visible', 'close', 'confirm'],
	setup(props, {emit}) {
		const state = reactive({
			visible: props.visible,
			percent: 0
		})
		watch(() => props.visible, (n) => {
			state.visible = n
		}, {
			immediate: true
		})
		watch(() => state.visible, (n) => {
			emit('update:visible', n)
			if (n){
				addPercent(180)
			}
		})
		const handleClose = () => {
			emit('close')
			state.visible = false
		}
		const handleConfirm = () => {
			emit('confirm')
		}

		const addPercent = (t) => {
			if (t>0) {
				t--
				setTimeout(() => {
					state.percent += 0.5
					addPercent(t)
				}, 50)
			} else {
				console.log('object');
				handleConfirm()
			}
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
.spin {
	animation: loading 3s linear infinite;
}
@keyframes loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>