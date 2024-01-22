import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'

const vuetify = createVuetify({
    components,
    directives,
  })

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(vuetify).mount('#app')
