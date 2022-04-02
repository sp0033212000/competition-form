<template>
  <el-header class="absolute top-0 left-0 flex items-center justify-end w-screen border-b border-solid border-gray-400">
    <ul class="flex items-center font-bold">
      <li v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" class="lang-item flex items-center"
          @click="onLangChange(locale)">
        <router-link :to="`/${locale}`">{{ $t(`public.${locale}`) }}</router-link>
      </li>
    </ul>
  </el-header>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    onLangChange(lang: string) {
      this.$i18n.locale = lang
    }
  }
})
</script>

<style lang="scss" scoped>
.lang-item {
  &:not(:last-child) {
    &::after {
      display: block;
      content: "/";
      margin: 0 0.5rem
    }
  }
}
</style>
