import { createApp } from 'vue'
import App from './App.vue';
import router from './router'
import 'element-plus/dist/index.css'
import LowForm from './release/index'
import {formData} from './release/formData'
const app = createApp(App)
app.use(router)
app.use(LowForm, {
getSchema: JSON.parse(formData.formSchema)
})
app.mount('#app')
