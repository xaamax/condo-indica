<script lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  components: {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  },
  name: 'TabsCustom',
  props: {
    tabs: {
      type: Array as PropType<
        Array<{
          target: string
          label: string
          class?: string
          active?: boolean
        }>
      >,
      required: true,
    },
    hideTabList: Boolean
  },
  setup(props) {
    const tabActive = ref(props.tabs[0]?.target || '')
    return {
      tabActive,
    }
  },
})
</script>

<template>
  <Tabs v-model="tabActive">
    <div class="flex flex-wrap items-center justify-between gap-2" v-if="!hideTabList">
      <TabsList>
        <TabsTrigger v-for="tab in tabs" :key="tab.target" :value="tab.target">
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
      <slot />
    </div>
    <TabsContent
      v-for="tab in tabs"
      :key="tab.target"
      :value="tab.target"
      :class="tab.class"
    >
      <slot :name="tab.target" />
    </TabsContent>
  </Tabs>
</template>
