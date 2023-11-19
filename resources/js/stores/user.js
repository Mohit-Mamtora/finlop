import { defineStore } from "pinia"
import axios from "@plugins/ApiService"


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
    async login(params) {
      try {
        const { response } = await axios.request(window.location.origin + "/login", "post", params)

        return response
      } catch ({ response }) {

        return response
      }
    },
  },
})