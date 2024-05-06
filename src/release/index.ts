
import {SchemaForm, FormDesign} from "@/components";
import type {App} from "vue";
import type {$optionsType} from "@/config/commonType";
import {$global} from "@/config/symbol";
import {mergeElements} from "@/release/mergeElements";
const components = [SchemaForm, FormDesign]

const install = (app: App<Element>, options: $optionsType = {}) => {
    const {getSchema, customElements = {}, iconSelectConfig } = options
    app.provide($global, {
        getSchema,
        elements: mergeElements(customElements)
        // iconSelectConfig: customIconSelect(iconSelectConfig)
    })
    components.forEach((component) => {
        app.component(component.name, component)
    })
}
export default {install}
