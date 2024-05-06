import type {formElement} from '@/config/commonType'

const modules = import.meta.glob('@/module/*/index.ts', { eager: true })
const Elements: {[component: string]: formElement} = {}

for (const path in modules) {
    const data = (modules[path] as {default: formElement}).default
    if(data) {
        Elements[data.initialValues.component] = data
    }
}

export default Elements
