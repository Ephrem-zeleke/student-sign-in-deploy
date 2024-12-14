import { createApp } from 'vue'
import { createPinia} from "pinia";


// import the bootstrap and bootstrap-icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'
import App from './App.vue'
// after we add the pinia library, we have to restructure the main js to use the pinia

//createApp(App).mount('#app')

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.mount('#app')
