<template>
  <div>
    test

    <button @click='handleCreateRoom'>createRoom</button>
    <button @click='handleCreatePool'>createPool</button>
    <button @click='getTrent' class="color-black bg-white px-16">trent</button>
  </div>
</template>

<script>
import {reactive, defineComponent, inject} from 'vue'
import usePermission from '@/sport/components/useHooks/use-permission'
import {createTenant} from '@/sport/api/index'
import {message} from 'ant-design-vue'

export default defineComponent({
  setup() {
    const state = reactive({

    })
    const CONTRACT = inject('CONTRACT')

    const {getPermission,
    hasPermission,
    createPool, } = usePermission()

    const handleCreateRoom = () => {
      createTenant({
        wallet: '0x02e506591c68d03d00f0c528e92e61f6f2b7e296',
        tenant: '12345678'
      }).then(res => {
        console.log(res)
      })
    }

    const getTrent = () => {
      // web3.eth.subscribe("pendingTransactions", function (error, result) {})
      // .on("data", function (transactionHash) {
      //   console.log("transactionHash: ", transactionHash);
      //   web3.eth.getTransaction(transactionHash).then(function (transaction) {
      //     console.log(transaction.from, transaction.to);
      //   });
      // })
      web3.eth.getTransactionCount("0x02e506591c68d03d00f0c528e92e61f6f2b7e296").then(res => {
        console.log(res)
      })
    }

    const handleCreatePool = async() => {
      const t = await hasPermission()
      if (t) {
        const amount = web3.utils.toWei('4', 'mwei')
        createPool(amount).then(res => {
          console.log(res)
        })
        // const a = await CONTRACT.value.erc_contract?.methods.decimals().call()
        
        // console.log(amount)
      } else {
        getPermission({
          callback: () => {
            message.info('Permission verification sent Success, Please wait link')
          },
          receipt: () => {
            message.success('Successfully linked')
            createPool(2000).then(res => {
              console.log(res)
            })
            emit('next')
          },
          error: (e) => {
            const msg = e.message?.split('{')?.[0] || 'Verification failed'
            message.error(msg)
          }
        })
      }
    }

    return {
      state,
      handleCreateRoom,
      handleCreatePool,
      getTrent
    }
  }
})
</script>