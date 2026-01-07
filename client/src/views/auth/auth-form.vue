<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'

import { authService } from '@/services/auth-service'
import { useAppStore } from '@/stores/app'
import router from '@/router'
import { toastError } from '@/plugins/toaster'
import Logo from '@/assets/images/logo.svg'
import CardDescription from '@/components/ui/card/CardDescription.vue'
import { LoginDTO } from '@/core/dto/auth-dto'
import { ref } from 'vue'

const appStore = useAppStore()
const { login } = authService()
const isLoading = ref(false)

const formSchema = toTypedSchema(
  z.object({
    username: z.string({ required_error: '(*) Campo obrigatório' }),
    password: z
      .string({ required_error: '(*) Campo obrigatório' })
      .min(4, { message: '(*) Mínimo 4 caracteres' })
  })
)

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (payload: LoginDTO) => {
  isLoading.value = true
  try {
    const response = await login(payload)
    appStore.setAuth(response.data)

    router.push('/dashboard')
  } catch (error: any) {
    toastError(
      error?.response?.data?.detail || 'Usuário ou senha inválidos'
    )
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="flex flex-1 items-center justify-center" style="padding: 30px">
    <Card class="w-full max-w-[320px] md:max-w-[400px] border-0 bg-transparent shadow-none">
      <CardHeader>
        <div class="flex items-center gap-2 mb-2">
          <img
            :src="Logo"
            alt="CondoIndicaLogo"
            class="hidden w-[80px] transition dark:invert dark:brightness-200 lg:block"
          />
          <span class="text-4xl font-semibold">CondoIndica</span>
        </div>
        <CardTitle>Faça login na sua conta</CardTitle>
        <CardDescription>Entre com seu usuário e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem class="mb-4">
              <FormControl>
                <Input type="text" v-bind="componentField" prepend-icon="User" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormControl>
                <InputPassword v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </CardContent>
      <CardFooter>
        <div class="w-full">
          <Button
            class="w-full"
            @click="onSubmit"
            :disabled="isLoading || !form.meta.value.valid"
            >{{ isLoading ? 'Acessando...' : 'Acessar' }}</Button
          >
          <div class="relative my-4">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  </main>
</template>
