import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
state: () => ({
isAuth: false,
user: null
}),
actions: {
login(user) {
this.isAuth = true
this.user = user
},
logout() {
this.isAuth = false
this.user = null
}
}
})
