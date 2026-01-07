<script setup lang="ts">
import DashboardSidebar from '@/components/sidebar/sidebar-main.vue'
import DashboardNavbar from '@/components/sidebar/sidebar-navbar.vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<template>
  <div>
    <DashboardSidebar />
    <div
      class="app-container relative"
      :style="`left: ${store.wrapperLeftOffset}px; width: calc(100% - ${store.wrapperLeftOffset}px)`"
    >
      <DashboardNavbar />
      <div class="m-auto mt-[64px] max-w-[1440px] p-2 lg:p-6">
        <router-view />
      </div>
    </div>
  </div>
</template>
