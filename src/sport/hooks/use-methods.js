// 智能合约的方法
import { message } from "ant-design-vue"
import { computed, inject, reactive } from "vue"

const usePermission = () => {
  const state = reactive({
    createLoading: false,
    permissionLoading: false
  })
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const CONTRACT = inject('CONTRACT')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  // bet_address  usdt_address: 下注合约地址
  const usdt_address = computed(() => ADDRESS.value.usdt_address)

  // 是否授权
  const hasPermission = async() => {
    const obj = await CONTRACT.value.erc_contract?.methods?.allowance(wallet_addr.value, ADDRESS.value.bet_address).call()
    if (obj < 1e+25) {
      return false
    } else {
      return true
    }
  }

  // 创建奖池
  const createPool = async(amout, callback) => {
    state.createLoading = true
    const gasPrice = await web3.eth.getGasPrice()
    const AMOUNT = web3.utils.toWei(`${amout}`, 'mwei')
    const t = await CONTRACT.value.football_contract?.methods.createFundPool(AMOUNT).encodeABI()
    const params = {
      from: wallet_addr.value,
      to: ADDRESS.value.bet_address,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: t,
      value: '0x00'
    }

    window.web3.eth.sendTransaction(params)
    .on('transactionHash', (hash) => {
      setTimeout(() => {
        message.info('Transaction sent Success, Please wait link')
        callback && callback(hash, null, null)
      }, 200)
    })
    .on('receipt', (r) => {
      setTimeout(() => {
        state.createLoading = false
        message.success('Successfully linked')
        callback && callback(null, r, null)
      }, 200)
    })
    .on('error', (e) => {
      message.error('Transaction Error')
      state.createLoading = false
      callback && callback(null, null, e)
    })
    return t
  }
  // 授权
  const getPermission = async(callback) => {
    const erc_contract = CONTRACT.value.erc_contract
    const amount = web3.utils.toHex('10000000000000000000000000')
    // const block = await web3.eth.getBlock("latest")
    // const gasLimit = block.gasLimit
    const obj = erc_contract.methods['approve'](ADDRESS.value.bet_address, amount).encodeABI()
    state.permissionLoading = true
    const gasPrice = await web3.eth.getGasPrice()
    const params = {
      from: wallet_addr.value,
      to: usdt_address.value,
      gasPrice: gasPrice,
      gasLimit: 1000000,
      data: obj,
      value: '0x00'
    }
    window.web3.eth.sendTransaction(params)
    .on('transactionHash', (hash) => {
      setTimeout(() => {
        message.info('Transaction sent Success, Please wait link')
        callback && callback(hash, null, null)
      }, 200)
    })
    .on('receipt', (r) => {
      
      setTimeout(() => {
        state.permissionLoading = false
        message.success('Successfully linked')
        callback && callback(null, r, null)
      }, 200)
    })
    .on('error', (e) => {
      message.error('Transaction Error')
      state.permissionLoading = false
      callback && callback(null, null, e)
    })
  }
  const createPoolLoading = computed(() => state.createLoading)
  const authLoading = computed(() => state.permissionLoading)
  
  return {
    getPermission,
    hasPermission,
    createPool,
    createPoolLoading,
    authLoading
  }
}

export const useBet = () => {
  const state = reactive({
    loading: false
  })
  const CONTRACT = inject('CONTRACT')
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  const ROOM = inject('ROOM')
  
  const handleBet = async(params, callback) => {
    state.loading = true
    const gasPrice = await web3.eth.getGasPrice()
    const {
      marketId, tenant, amount, betSide, minOdds
    } = params
    console.log(marketId, tenant, amount, betSide, minOdds);

    const t = await CONTRACT.value.football_contract?.methods.bet(marketId, ROOM?.roomAddress?.value, amount, `${betSide}`, `${minOdds}`).encodeABI()
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
        message.info('Transaction sent Success, Please wait link')
        callback && callback(hash, null, null)
      }, 200)
    })
    .on('receipt', (r) => {
      setTimeout(() => {
        state.loading = false
        message.success('Successfully linked')
        callback && callback(null, r, null)
      }, 200)
    })
    .on('error', (e) => {
      message.error('Transaction Error')
      state.loading = false
      console.log(e);
      callback && callback(null, null, e)
    })
    return t
  }

  const getLoading = computed(() => state.loading)
  return {
    handleBet,
    getLoading
  }
}


export const stopPool = () => {
  const state = reactive({
    loading: false
  })
  const CONTRACT = inject('CONTRACT')
  const ADDRESS = inject('ADDRESS')
  const ACCOUNTS = inject('ACCOUNTS')
  const wallet_addr = computed(() => ACCOUNTS.accounts.value[0])
  const ROOM = inject('ROOM')
  
  const handleBet = async(params, callback) => {
    state.loading = true
    const gasPrice = await web3.eth.getGasPrice()
    const {
      marketId, tenant, amount, betSide, minOdds
    } = params
    console.log(marketId, tenant, amount, betSide, minOdds);

    const t = await CONTRACT.value.football_contract?.methods.bet(marketId, ROOM?.roomAddress?.value, amount, `${betSide}`, `${minOdds}`).encodeABI()
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
        message.info('Transaction sent Success, Please wait link')
        callback && callback(hash, null, null)
      }, 200)
    })
    .on('receipt', (r) => {
      setTimeout(() => {
        state.loading = false
        message.success('Successfully linked')
        callback && callback(null, r, null)
      }, 200)
    })
    .on('error', (e) => {
      message.error('Transaction Error')
      state.loading = false
      console.log(e);
      callback && callback(null, null, e)
    })
    return t
  }

  const getLoading = computed(() => state.loading)
  return {
    handleBet,
    getLoading
  }
}

export default usePermission