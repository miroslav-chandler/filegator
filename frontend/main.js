import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import shared from './mixins/shared'
import axios from 'axios'
import api from './api/api'
import VueLazyload from 'vue-lazyload'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'

//TODO: import './registerServiceWorker'

const app = createApp(App)

app.config.productionTip = false

// Buefy expects Vue 2 style prototype object. Map Vue 3 global properties so
// plugin install doesn't fail.
app.prototype = app.config.globalProperties

/* eslint-disable-next-line */
app.config.baseURL = process.env.VUE_APP_API_ENDPOINT ? process.env.VUE_APP_API_ENDPOINT : window.location.origin+window.location.pathname+'?r='

app.config.globalProperties.$baseURL = app.config.baseURL

axios.defaults.withCredentials = true
axios.defaults.baseURL = app.config.baseURL

axios.defaults.headers['Content-Type'] = 'application/json'

app.use(Buefy, {
  defaultIconPack: 'fas',
})

app.use(VueLazyload, {
  preLoad: 1.3,
})

app.mixin(shared)
app.use(router)
app.use(store)

app.mixin({
  created() {

    api.getConfig()
      .then(ret => {
        this.$store.commit('setConfig', ret.data.data)
        api.getUser()
          .then((user) => {
            this.$store.commit('initialize')
            this.$store.commit('setUser', user)
            this.$router.push('/').catch(() => {})
          })
          .catch(() => {
            this.$notification.open({
              message: this.lang('Something went wrong'),
              type: 'is-danger',
              queue: false,
              indefinite: true,
            })
          })
      })
      .catch(() => {
        this.$notification.open({
          message: this.lang('Something went wrong'),
          type: 'is-danger',
          queue: false,
          indefinite: true,
        })
      })
  }
})

app.mount('#app')
