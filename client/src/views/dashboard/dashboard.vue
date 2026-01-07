<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/daterange-picker';
import RecentSales from '@/components/examples/RecentSales.vue';
import Overview from '@/components/examples/Overview.vue';

import { dashboardService } from '@/services/dashboard-service';
import { DashboardDTO } from '@/core/dto/dashboard-dto';
import { onMounted, ref } from 'vue';

const { getDashboard } = dashboardService();
const dashboard = ref<DashboardDTO>()

const loadDashboard = () => {
  getDashboard({ start: new Date(), end: new Date() }).then(response => {
    dashboard.value = response.data;
  });
};

onMounted(() => loadDashboard())
</script>

<template>
  <div class="space-y-4">
    <page-header title="Dashboard">
      <div class="flex items-center space-x-2">
        <DateRangePicker />
        <Button prepend-icon="Search" size="icon" />
      </div>
    </page-header>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card v-for="(card, i) in dashboard?.cards" :key="i">
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium"> {{ card.title }} </CardTitle>
              <Icon :name="card.icon" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ card.value }}</div>
            </CardContent>
          </Card>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card class="col-span-4">
            <CardHeader>
              <CardTitle>Prestadores Recomendados</CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Top 5 Prestadores</CardTitle>
              <CardDescription>
                São os melhores avaliados e recomendados nesse período.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
  </div>
</template>
