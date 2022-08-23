<template>
  <Web3Provider>
    <InitProvider>
      <RoomProvider>
        <SportProvider>
          <ResultProvider>
            <Page />
          </ResultProvider>
        </SportProvider>
      </RoomProvider>
    </InitProvider>
  </Web3Provider>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import InitProvider from "./components/init-provider.vue";
import Page from "./page.vue";
import Web3Provider from "./components/web3";
import SportProvider from "./components/sport-bet-provider.vue";
import RoomProvider from "./components/room/init-provider.vue";
import Test from "@/sport/components/test.vue";
import ResultProvider from "@/sport/components/result/result-provider.vue";

export default defineComponent({
  components: {
    InitProvider,
    Page,
    Web3Provider,
    SportProvider,
    RoomProvider,
    Test,
    ResultProvider,
  },
});
</script>
