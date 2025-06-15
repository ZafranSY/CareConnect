import { createApp } from "vue"
import App from "./App.vue"
import router from "./src/router"
import store from "./store"
import "./assets/css/main.css"

createApp(App).use(store).use(router).mount("#app")
