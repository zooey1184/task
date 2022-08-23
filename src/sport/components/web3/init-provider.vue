<template>
  <div>
    <slot></slot>
  </div>
  <DownloadModal v-model:visible="state.downloadModalVisible" />
</template>

<script>
import { message } from "ant-design-vue";
import {
  defineComponent,
  reactive,
  ref,
  provide,
  computed,
  watch,
  onMounted,
} from "vue";
import DownloadModal from "../download-modal.vue";
import { getConfig, getBonusInfo } from "@/sport/api/index";
import { abi } from "./index";

export default defineComponent({
  components: {
    DownloadModal,
  },
  props: {},
  setup(props) {
    const state = reactive({
      accounts: undefined,
      id: undefined,
      downloadModalVisible: false,
      userInfo: undefined,
      address: undefined,
      contract: {},
      eth: 0,
      bet: 0,
      usdt: 0,
    });
    // 点击连接钱包
    const handleConnect = () => {
      if (typeof window.ethereum !== "undefined") {
        if (!state.accounts?.length) {
          ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => {
              state.accounts = res;
              window.location.reload();
              window.localStorage.setItem("isLINK", "true");
            })
            .catch((e) => {
              // toast(e.message)
              message.error(e.message);
              window.localStorage.setItem("isLINK", "false");
            });
        } else {
          window.localStorage.setItem("isLINK", "true");
          window.location.reload();
        }
      } else {
        state.downloadModalVisible = true;
      }
    };

    const addressHide = computed(() => {
      if (state.id) {
        const len = state.id.length;
        return state.id.substring(0, 6) + "..." + state.id.substring(len - 4);
      }
      return "**";
    });
    const isLink = computed(() => {
      const isLINK = window.localStorage.getItem("isLINK");
      return isLINK && isLINK === "true" && state.accounts?.length;
    });
    const getAccounts = computed(() => state.accounts);

    provide("accounts", getAccounts);

    const getBet = computed(() => state.bet);
    const getUsdt = computed(() => state.usdt);
    const getEth = computed(() => state.eth);
    provide("ACCOUNTS", {
      accounts: getAccounts,
      id: getAccounts.value?.[0],
      accountHide: addressHide,
      isLink,
      link: handleConnect,
      bet: getBet,
      eth: getEth,
      usdt: getUsdt,
      disLink: () => {
        window.localStorage.removeItem("isLINK");
        setTimeout(() => {
          window.location.reload();
        });
      },
    });

    const init = async (cb) => {
      if (typeof web3 !== "undefined") {
        web3 = new Web3(web3.currentProvider);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        setTimeout(() => {
          web3.givenProvider.on("accountsChanged", (accounts) => {
            window.location.reload();
          });
          web3.givenProvider.on("chainChanged", (chainId) => {
            window.location.reload();
          });
          web3.givenProvider.on("disconnect", (code, reason) => {
            window.location.reload();
          });
        });
        if (accounts?.length) {
          state.accounts = accounts;
          state.id = accounts[0];
          const isLINK = window.localStorage.getItem("isLINK");
          // TODO 初始化合约
          if (isLINK && isLINK === "true") {
            state.userInfo = {
              _accounts: accounts,
            };
            window.localStorage.setItem("isLINK", "true");
            // TODO 获取余额
            handleGetEth(state.id);
            cb && cb();
          }
        } else {
          console.log("未连接");
        }
      } else {
        web3 = new Web3(
          // new Web3.providers.HttpProvider("http://localhost:8545")
          new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546")
        );
      }
    };

    // 获取地址
    const getWeb3Config = () => {
      getConfig().then((res) => {
        state.address = res;
        initContract(res.bet_address, res.usdt_address);
      });
    };

    const getAddress = computed(() => state.address);
    provide("ADDRESS", getAddress);

    // 质押信息
    const getBounsInfoFn = () => {
      getBonusInfo().then((res) => {
        console.log("object", res);
      });
    };

    const initContract = (bet_address, usdt_address) => {
      const { ERC20_ABI, BONUS_ABI, FOOTBALL_ABI } = abi;
      const erc_contract = new web3.eth.Contract(ERC20_ABI, usdt_address);
      const bonus_contract = new web3.eth.Contract(BONUS_ABI, bet_address);
      const football_contract = new web3.eth.Contract(
        FOOTBALL_ABI,
        bet_address
      );

      state.contract = {
        erc_contract,
        bonus_contract,
        football_contract,
      };
      getBalanceOf(erc_contract, bet_address, "mWei").then((res) => {
        state.bet = res;
      });
      getBalanceOf(erc_contract, state.id, "mWei").then((res) => {
        state.usdt = res;
      });
    };

    const getBalanceOf = async (contract, account, unit = "wei") => {
      const res = await contract.methods.balanceOf(account).call();
      return web3.utils.fromWei(res, unit);
    };

    const handleGetEth = async (account) => {
      web3.eth.getBalance(account, (err, wei) => {
        const balance = web3.utils.fromWei(wei, "ether");
        state.eth = balance;
        // res(balance);
      });
    };

    const getCnotract = computed(() => state.contract);

    provide("CONTRACT", getCnotract);

    onMounted(() => {
      init(() => {
        getWeb3Config();
      });

      // getBounsInfoFn();
    });
    return {
      state,
    };
  },
});
</script>
