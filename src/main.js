import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faSearch, faCog, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faCog, faPlus, faMinus)

createApp(App)
.component('Icon', FontAwesomeIcon)
.mount('#app')