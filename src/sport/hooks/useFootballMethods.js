import { computed, inject, reactive } from "vue"
import { message } from "ant-design-vue"
const useMethods = () => {
  const CONTRACT = inject('CONTRACT')
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const state = reactive({
    loading: false
  })

  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  
  const handleMethods = async(options) => {
    state.loading = true
    const {
      name,
      params = [],
      callback,
      showTip = true
    } = options
    const gasPrice = await web3.eth.getGasPrice()

    const t = await CONTRACT.value.football_contract?.methods[name](...params).encodeABI()
    const PARAMS = {
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: t,
      value: '0x00'
    }

    window.web3.eth.sendTransaction(PARAMS)
    .on('transactionHash', (hash) => {
      setTimeout(() => {
        showTip && message.info('Transaction sent Success, Please wait link')
        callback && callback(hash, null, null)
      }, 200)
    })
    .on('receipt', (r) => {
      setTimeout(() => {
        state.loading = false
        showTip && message.success('Successfully linked')
        callback && callback(null, r, null)
      }, 200)
    })
    .on('error', (e) => {
      showTip && message.error('Transaction Error')
      state.loading = false
      callback && callback(null, null, e)
    })
    return t
  }

  const getLoading = computed(() => state.loading)
  return {
    handleMethods,
    getLoading
  }
}

export default useMethods