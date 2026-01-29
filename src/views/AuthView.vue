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

<!--Image CAPTCHA (only login) -->
<div v-if="mode === 'Login'" class="mt-1">
  <div class="flex items-center gap-3">
    <canvas
      ref="canvasRef"
      width="120"
      height="40"
      class="border rounded-lg bg-white"
    ></canvas>

    <button
      class="text-sm text-purple-600 hover:underline"
      @click="regenerateCaptcha"
      type="button"
    >
      🔄
    </button>
  </div>

  <input
    v-model="captchaInput"
    placeholder="کد داخل تصویر"
    class="input mt-2"
  />
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
 // شروع کپچا
import { onMounted} from 'vue'

const captchaText = ref('')
const captchaInput = ref('')
const canvasRef = ref(null)

const generateCaptchaText = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  captchaText.value = Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

const drawCaptcha = () => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // background
  ctx.fillStyle = '#f3e8ff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // noise lines
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(120, 60, 200, 0.4)`
    ctx.beginPath()
    ctx.moveTo(Math.random() * 120, Math.random() * 40)
    ctx.lineTo(Math.random() * 120, Math.random() * 40)
    ctx.stroke()
  }

  // text
  ctx.font = '22px sans-serif'
  ctx.textBaseline = 'middle'

  captchaText.value.split('').forEach((char, i) => {
    ctx.save()
     ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`
    ctx.translate(20 + i * 18, 20)
    ctx.rotate((Math.random() - 0.5) * 0.4)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  })
}

const regenerateCaptcha = () => {
  generateCaptchaText()
  drawCaptcha()
  captchaInput.value = ''
}

onMounted(regenerateCaptcha)
 // پایان کپچا


const router = useRouter()
const auth = useAuthStore()


const mode = ref('Login')
const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)



const toggle = () => mode.value = mode.value === 'Login' ? 'Register' : 'Login'


const submit = () => {
  if (mode.value === 'Login') {
    if (
      captchaInput.value.toUpperCase() !== captchaText.value
    ) {
      alert('❌ کپچا اشتباه است')
      regenerateCaptcha()
      return
    }
  }

  auth.login({
    username: username.value,
    email: email.value,
    password: password.value
  })

  router.push('/notes')
}

</script>

<style scoped>
.input { @apply w-full border p-2 rounded mb-2 }
.btn { @apply w-full bg-indigo-600 text-white py-2 rounded }
</style>
