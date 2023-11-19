import { defineStore } from "pinia"

export const userStore = defineStore('user', {
  state: () => (
    {
      user: {
        id: null, 
        name: null,
        email: null,
        password: null,
      },
      sessionToken: null,
    }
  ),
  getters: {
    isAuthenticated: state => state.sessionToken != null,
  },
  actions: {
    login(username, password) {
      console.log(username, password)
    },
  },
})