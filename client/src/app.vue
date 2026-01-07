<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import Layout from './components/layouts/layout.vue'
import Loading from './components/loading.vue'

const store = useAppStore()

onMounted(() => {
  store.initTheme()
  // store.loadAuth()
})
</script>

<template>
  <Layout fixed>
    <router-view />
    <Loading v-if="store.isLoading" />
  </Layout>
</template>
