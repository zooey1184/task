<template>
  <div class="px-24 py-16">
    <Content>
      <template #headerExtra>
        <!-- <=1200px 出现 -->
        <div class="flex slide-h">
          <div
            v-for="item in getCompetitionName"
            class="slider-h-wrap flex flex-col items-center justify-center"
          >
            <div
              class="logo bg-dark50 flex items-center overflow-hidden justify-center"
            >
              <img src="../images/zyq0425/LIcon02.png" alt="" />
            </div>
            <div class="ellipsis-1 grey text-align-center" :title="item.label">
              {{ item.label }}
            </div>
            <div class="gray">{{ item.count }}</div>
          </div>
        </div>
      </template>
    </Content>
  </div>
</template>

<script>
import { defineComponent, ref, inject, computed } from "vue";
import Content from "@/sport/components/content.vue";

export default defineComponent({
  components: {
    Content,
  },
  props: {},
  setup(props) {
    const COMPETITION_NAME = inject("COMPETITION_NAME", {
      value: [],
    });
    const getCompetitionName = computed(() => COMPETITION_NAME.value);
    return {
      getCompetitionName,
    };
  },
});
</script>

<style lang="less" scoped>
.slide-h {
  width: 100%;
  overflow: auto;
  padding: 0 16px;
  padding-top: 16px;
  display: none;
  @media screen and (max-width: 1200px) {
    display: flex;
  }
}
.logo {
  width: 60px;
  height: 60px;
  border-radius: 40px;
}
.slider-h-wrap {
  width: 100px;
}
</style>
