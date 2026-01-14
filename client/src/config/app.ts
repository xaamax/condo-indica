interface IDashboardMenus {
  title: string
  icon: string
  path: string
  description?: string
  hidden?: boolean
}

export const SIDEBAR_EXPAND_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const APP_MENU: Record<string, { name: string; routes: IDashboardMenus[] }> = {
  main: {
    name: '',
    routes: [
      {
        title: 'Dashboard',
        icon: 'LayoutDashboard',
        path: 'dashboard'
      },
      {
        title: 'Prestadores de Serviços',
        icon: 'Wrench',
        path: 'prestadores_servicos',
        description: 'Manage Providers'
      },
      {
        title: 'Avaliações',
        icon: 'Star',
        path: 'avaliacoes',
        description: 'Manage Ratings'
      }
    ]
  },
  // settings: {
  //   name: 'Configurações',
  //   routes: [
  //     {
  //       title: 'Suporte',
  //       icon: 'Settings',
  //       path: 'suporte',
  //     }
  //   ]
  // }
}

export const globalSearch = {}
