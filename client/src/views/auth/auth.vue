<script setup lang="ts">
import AuthForm from './auth-form.vue'
import WallpaperLogin from '@/assets/images/wallpaper_login.png'
</script>

<template>
  <div class="flex h-screen">
    <img
      :src="WallpaperLogin"
      alt="LoginWallpaper"
      class="hidden h-full w-2/3 object-cover lg:block"
    />
    <AuthForm />
  </div>
</template>