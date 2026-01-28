<template>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
<div class="bg-white p-6 rounded-xl w-96">
<h2 class="text-xl font-bold mb-4">{{ mode }}</h2>


<input v-model="username" placeholder="Username" class="input" />
<input v-if="mode==='Register'" v-model="email" placeholder="Email" class="input" />
<div class="relative">
  <input
    :type="showPassword ? 'text' : 'password'"
    v-model="password"
    placeholder="Password"
    class="input pr-10"
  />

  <span
    class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
    @click="showPassword = !showPassword"
  >
    👁
  </span>
</div>



<button class="btn" @click="submit">{{ mode }}</button>


<p class="text-sm mt-3 cursor-pointer text-blue-600" @click="toggle">
{{ mode==='Login' ? 'ثبت نام' : 'ورود' }}
</p>


<button v-if="mode==='Login'" class="text-sm mt-2 text-gray-500">ورود با گوگل</button>
<button v-if="mode==='Login'" class="text-sm text-red-500">فراموشی رمز عبور</button>
</div>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'


const router = useRouter()
const auth = useAuthStore()


const mode = ref('Login')
const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)



const toggle = () => mode.value = mode.value === 'Login' ? 'Register' : 'Login'


const submit = () => {
auth.login({ username: username.value })
router.push('/notes')
}
</script>

<style scoped>
.input { @apply w-full border p-2 rounded mb-2 }
.btn { @apply w-full bg-indigo-600 text-white py-2 rounded }
</style>
