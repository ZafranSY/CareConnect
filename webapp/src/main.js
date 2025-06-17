import { createApp } from "vue"
import App from "./App.vue"
import router from './router'
import store from "./store"
import "./assets/css/main.css"
import { db } from "./firebaseConfig"
createApp(App).use(store).provide('db',db).use(router).mount("#app")
