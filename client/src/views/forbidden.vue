<template>
  <div class="flex h-screen flex-col items-center justify-center text-center">
    <h1 class="mb-4 text-5xl font-bold">Ops!</h1>
    <p class="mb-4 text-xl">Você não possui permissão para acessar essa tela.</p>
    <p class="mb-6 text-gray-500">
      Entre em contato com o administrador do sistema para mais informações.
    </p>
    <Button prepend-icon="ArrowLeft" @click="$router.push('/')">
      Voltar ao início
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>
