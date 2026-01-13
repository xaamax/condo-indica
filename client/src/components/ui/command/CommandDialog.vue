<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from '@/components/ui/dialog'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogTitle />
    <DialogHeader />
    <DialogDescription />
    <DialogContent class="overflow-hidden rounded p-0 shadow-lg">
      <slot />
      <DialogFooter>
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
