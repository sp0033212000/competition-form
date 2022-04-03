<template>
  <div>
    <LHeader />
    <el-main
      class="relative mx-auto mt-[3.75rem] min-h-[calc(100vh-3.75rem)] max-w-[40rem]"
    >
      <router-view />
    </el-main>
  </div>
</template>
<script lang="ts" setup>
import LHeader from "@components/layout/l-header.vue";
</script>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  watch: {
    "$route.params.lang": {
      deep: true,
      handler: (value) => {
        document.querySelector("html")!.lang = value;
      },
    },
  },
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 16px;
  @apply text-gray-900;
}
</style>
