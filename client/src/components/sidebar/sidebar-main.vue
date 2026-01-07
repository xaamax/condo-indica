<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import SidebarInner from './sidebar-inner.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const width = ref(window.innerWidth)

const onResize = () => {
  width.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

const isVisible = computed(() => width.value < 1025)
</script>

<template>
  <div>
    <SidebarInner class="hidden lg:block" />
    <div v-if="isVisible" class="block lg:hidden">
      <Sheet :open="store.sidebarExpanded">
        <SheetContent
          class="p-0"
          side="left"
          style="width: 280px"
          :show-close="false"
          @interact-outside="store.toggleSidebar()"
        >
          <SidebarInner style="width: 280px" />
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
