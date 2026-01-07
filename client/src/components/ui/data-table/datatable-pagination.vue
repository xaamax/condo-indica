<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-icons/vue'

const props = defineProps<{
  table: any
}>()

const pageSizeOptions = [10, 20, 30, 40, 50]

const selectedPageSize = ref(`${props.table.getState().pagination.pageSize}`)

watch(selectedPageSize, (value) => {
  props.table.setPageSize(Number(value))
})

const currentPage = computed(
  () => props.table.getState().pagination.pageIndex + 1
)
const totalPages = computed(() => props.table.getPageCount())
</script>

<template>
  <div class="flex items-center justify-between overflow-auto px-2">
    <div></div>
    <div class="sm:space-x-6 flex items-center lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="sm:block hidden text-sm font-medium">Itens por página</p>
        <select
          v-model="selectedPageSize"
          class="h-8 w-[70px] rounded border bg-background px-2 text-sm"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <div
        class="flex w-[100px] items-center justify-center text-sm font-medium"
      >
        Pág {{ currentPage }} de {{ totalPages }}
      </div>

      <div class="flex items-center space-x-2">
        <button
          class="hidden h-8 w-8 items-center justify-center rounded border bg-background p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Ir para a primeira página</span>
          <DoubleArrowLeftIcon class="h-4 w-4" />
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded border bg-background p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Página anterior</span>
          <ChevronLeftIcon class="h-4 w-4" />
        </button>
        <button
          class="flex h-8 w-8 items-center justify-center rounded border bg-background p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Próxima página</span>
          <ChevronRightIcon class="h-4 w-4" />
        </button>
        <button
          class="hidden h-8 w-8 items-center justify-center rounded border bg-background p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Última página</span>
          <DoubleArrowRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
