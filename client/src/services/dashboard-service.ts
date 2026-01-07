import { get, type ApiResult } from '@/services/api/api'
import dayjs from 'dayjs'

import { URL_DASHBOARD } from '@/core/constants/urls-api'
import type { DashboardDTO } from '@/core/dto/dashboard-dto'

export function dashboardService() {  
    const getDashboard = async(period: {
    start: Date
    end: Date
  }): Promise<ApiResult<DashboardDTO>> => {
    const params = {
      start_date: dayjs(period.start).format('YYYY-MM-DD'),
      end_date: dayjs(period.end).format('YYYY-MM-DD'),
    }
    return get(URL_DASHBOARD, { params })
  }

  return {
    getDashboard
  }
}