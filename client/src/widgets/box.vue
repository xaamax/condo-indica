<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-sm font-medium"> {{ props.title }} </CardTitle>
      <Icon :name="props.icon" class="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">{{ props.value }}</div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string; icon: string; value: number | string }>()
</script>
