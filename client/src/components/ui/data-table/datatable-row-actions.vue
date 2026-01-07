<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

defineProps<{
  align?: 'start' | 'center' | 'end'
  icon?: string
  disabled?:boolean
  viewOnly?: boolean
}>()

</script>

<template>
  <DropdownMenu :modal="false">
    <DropdownMenuTrigger>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon :name="icon || 'EllipsisVertical'" class="h-4 w-4" />
        <span class="sr-only">Abrir menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="align || 'end'" class="w-[160px]">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
