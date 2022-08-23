<template>
  <slot></slot>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  provide,
  reactive,
  watch,
} from "vue";
import { queryTenant, getRoomAddress } from "@/sport/api/index";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      code: undefined,
      otherCode: undefined,
      roomAddress: undefined,
    });
    const ACCOUNTS = inject("ACCOUNTS");

    const getAccounts = computed(() => ACCOUNTS.accounts.value);

    const handleGetRoomAddress = (tenant) => {
      getRoomAddress({
        tenant: tenant,
      }).then((res) => {
        console.log(res);
        state.roomAddress = res;
      });
    };

    const handleGetCode = () => {
      const n = getAccounts?.value;
      const id = n?.[0];
      if (id) {
        queryTenant({ wallet: id }).then((res) => {
          state.code = res?.length ? res : "";
          if (state.code) {
            handleGetRoomAddress(state.code);
          }
        });
      }
    };
    watch(
      () => getAccounts?.value,
      (n) => {
        handleGetCode();
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state?.code,
      (n) => {
        if (state.code) {
          handleGetRoomAddress(state.code);
        }
      },
      {
        immediate: true,
      }
    );

    const getCode = computed(() => state.code);
    const getOtherCode = computed(() => state.otherCode);
    const getRoomAddressC = computed(() => state.roomAddress);

    provide("ROOM", {
      code: getCode,
      otherCode: getOtherCode,
      roomAddress: getRoomAddressC,
      handleGetCode,
      setState: (data) => {
        for (let i in data) {
          state[i] = data[i];
        }
      },
    });

    return {
      state,
    };
  },
});
</script>
