import elements from '@/module'
import type {formElement} from "@/config/commonType";

export const mergeElements = (customElements: {[key: string]: formElement}) => {
    const mergeElements: {[key: string]: formElement} = {}
    Object.entries(elements).forEach(([key, value]) => {
        const customData = customElements[key]
        if (customData) {
            return (mergeElements[key] = {
                ...value,
                component: customData.component,
                modelName: customData.modelName || 'modelValue',
                attr: customData.attr || value.attr
            })
        }
        return (mergeElements[key] = {...value, modelName: 'modelValue'})
    })
    return mergeElements
}
