import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSearch, faCog } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faCog)

createApp(App)
.component('Icon', FontAwesomeIcon)
.mount('#app')