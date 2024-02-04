import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

import vuetify from './plugins/vuetify'
import SvgIcon from '@jamescoyle/vue-icon'

const vuetify1 = createVuetify({
    //components,
    //directives,
    vuetify
  })

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(vuetify1).mount('#app')
