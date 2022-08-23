<template>
  <div class="wapMenu">
		<ul>
      <li v-for='item in options'>
        <a 
          href="javascript:;"
          class="hdNavA"
          @click='handlePick(item)'
          :class="{'on': state.active === item.value}"
        >
          <i class="hdNavI" v-if='item.icon' :style="{backgroundPosition: state.active === item.value ? 'center 100%': ''}" :class="item.icon"></i>
          <p>{{item.label}}</p>
        </a>
      </li>
		</ul> 

		<div class="zyqhdwal flexC fl-bet"  v-if='isLink'>
			<i class="zyqhdwalI"></i>
			<div class="qhdwalN flexC">
				<p>0</p>
				<span>$0</span>
			</div>
			<a href="javascript:;" class="zyqhdwala IndBac1">wallet</a>
		</div>
    
		<div class="zyqhdXD" v-if='isLink'>
			<a href="javascript:;" class="zyqhdId flexC fl-bet Huans">
				<div class="RightHdI"><img src="../images/zyq0425/pic01.jpg"></div>
				<div class="RightHdN">
					<p>{{getId}}</p>
					<div class="RightHdJ"></div>
				</div>
			</a>
		</div>

		<!-- <a href="javascript:;" v-if='!isLink' class="hdBut IndBac1">link wallet</a> -->
	</div>    
</template>

<script>
import { computed, defineComponent, reactive, ref, watch, inject } from 'vue'

export default defineComponent({
  components: {},
  props: {
    userInfo: {
      type: Object
    },
    ID: {
      type: [String, Number]
    },
    active: {
      type: String
    },
    options: {
      type: Array
    }
  },
  emits: ['link', 'update:active'],
  setup(props, {emit}) {
    
    const state = reactive({
      active: props.active,
    })
    const SPORTS = inject('SPORTS')

    const ACCOUNTS = inject('ACCOUNTS')
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value
    })
    const isLogin = computed(() => props.ID?.length)
    
    const getId = computed(() => ACCOUNTS.accountHide.value)

    watch(() => props.active, (n) => {
      state.active = n
    }, {
      immediate: true
    })
    watch(() => state.active, (n) => {
      emit('update:active', n)
    })

    const handlePick = (item) => {
      state.active = item.value
    }

    const handleConnect = () => {
      emit('link')
    }

    const handleShowNav = () => {
      if(!$('.wapNav').hasClass('wapNavO')){
        $('.wapNav').addClass('wapNavO');$(".wapMenu").slideDown(100);
      }else{
        $('.wapNav').removeClass('wapNavO');$('.wapMenu').slideUp(100);
      }
    }

    return {
      state,
      getId,
      isLink,
      SPORTS,
      ACCOUNTS,
      handlePick,
      isLogin,
      handleConnect,
      handleShowNav
    }
  }
})
</script>

<style lang="less" scoped>
.on {
  color: #366efc;
}
</style>
