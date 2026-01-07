import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import type { LoginResponseDTO } from '@/core/dto/auth-dto'
import { post } from '@/services/api/api'
import router from '@/router'

type ThemeMode = 'light' | 'dark'

const LIGHT: ThemeMode = 'light'
const DARK: ThemeMode = 'dark'
const THEME_KEY = 'themeMode'
const EXPAND = 280
const SHRINKED = 72
const HIDE_VALUES_CURRENCY_KEY = 'hideValuesCurrency'

interface AppState {
  themeMode: ThemeMode
  sidebarExpand: boolean
  wrapperWidth: number | string
  wrapperLeftOffset: number | string
  navWidth: number | string
  isLoading?: boolean
  hideValuesCurrency: boolean
  notifications: Notification[]
  supportMode: boolean
  auth?: LoginResponseDTO
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    themeMode: LIGHT,
    sidebarExpand: true,
    wrapperWidth: EXPAND,
    wrapperLeftOffset: EXPAND,
    navWidth: `calc(100% - ${EXPAND}px)`,
    isLoading: false,
    hideValuesCurrency: JSON.parse(
      localStorage.getItem(HIDE_VALUES_CURRENCY_KEY) || 'true'
    ),
    notifications: [],
    supportMode: false,
    auth: undefined
  }),

  getters: {
    isDark: (s) => s.themeMode === DARK,
    sidebarExpanded: (s) => s.sidebarExpand,

    // currentPermission: (s) => (path: string) => {
    //   if (!s.auth?.userData?.permissoes) return null
    //   const routeSegment = path.split('/')[1]
    //   return s.auth.userData.permissoes.find(
    //     (p: any) => p.restrito && p.url.replace(/^\//, '') === routeSegment
    //   )
    // },

    // canView() {
    //   return (path: string) => !!this.currentPermission(path)?.consultar
    // },
    // canCreate() {
    //   return (path: string) => !!this.currentPermission(path)?.incluir
    // },
    // canUpdate() {
    //   return (path: string) => !!this.currentPermission(path)?.alterar
    // },
    // canDelete() {
    //   return (path: string) => !!this.currentPermission(path)?.excluir
    // },
    // viewOnly() {
    //   return (path: string) => {
    //     const p = this.currentPermission(path)
    //     return p?.consultar && !p?.incluir && !p?.alterar && !p?.excluir
    //   }
    // }
  },

  actions: {
    setAuth(auth: LoginResponseDTO) {
      this.auth = auth
      Cookies.set('persist:condoindica', JSON.stringify(auth))
    },

    async loadAuth() {
      const response = await post('/v1/me', {})
      if (response.success) {
        this.auth!.userData = response.data
      }
    },

    logout() {
      Cookies.remove('persist:condoindica')
      Cookies.remove('persist_main:condoindica')
      localStorage.clear()
      this.auth = undefined
      router.push('/login')
    },

    // setHubs(hubs: HUBS[]) {
    //   if (!this.auth?.userData) return
    //   this.auth.userData.hubs = hubs
    //   Cookies.set('persist:my-finances', JSON.stringify(this.auth))
    // },

    toggleSidebar() {
      this.sidebarExpand = !this.sidebarExpand
      this.initWrapper()
    },

    initWrapper() {
      if (window.innerWidth > 1024) {
        const width = this.sidebarExpand ? EXPAND : SHRINKED
        this.wrapperWidth = width
        this.wrapperLeftOffset = width
        this.navWidth = `calc(100% - ${width}px)`
      } else {
        this.navWidth = '100%'
        this.sidebarExpand = false
        this.wrapperWidth = '100%'
        this.wrapperLeftOffset = '100%'
      }
    },

    initTheme() {
      const cache = localStorage.getItem(THEME_KEY) as ThemeMode | null
      if (cache) this.themeMode = cache
      window.addEventListener('resize', this.initWrapper)
      this.applyTheme()
      this.initWrapper()
    },

    toggleTheme() {
      this.themeMode = this.themeMode === LIGHT ? DARK : LIGHT
      localStorage.setItem(THEME_KEY, this.themeMode)
      this.applyTheme()
    },

    applyTheme() {
      document.documentElement.classList.remove(LIGHT, DARK)
      document.body.classList.remove(LIGHT, DARK)
      document.documentElement.classList.add(this.themeMode)
      document.body.classList.add(this.themeMode)
    },
  }
})
