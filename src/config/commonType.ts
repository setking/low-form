import type { AxiosInstance } from 'axios'
type anyObject = {[key: string]: any}

type formValuesType = anyObject
type contextType = {
    $values: formValuesType
    $selectData: formValuesType
    $initialValues: formValuesType
    [key: string]: any
}
type changeItemType = {
    target: string,
    value: any
}

interface formItemType {
    label?: string
    name: string
    component: string
    required?: boolean
    props?: object
    initialValues?: any
    help?: string
    children?: formItemType[]
    hidden?: boolean | string
    hideLabel?: boolean
    designKey?: string
    rules?: any[]
    class?: any
    style?: any
    design?: boolean
    change?: changeItemType[]
}
type formItemsType = formItemType[]
type schemaType = {
    labelWidth: number
    labelAlign: 'top' | 'left' | 'right' | string
    size: 'default' | 'small' | 'large' | string
    disabled?: boolean
    hideRequiredAsterisk?: boolean
    labelBold?: boolean
    items: formItemsType
}
type formElement = {
    name: string
    component: any
    icon: string
    type: 'assist' | 'layout' | 'basic' | 'high'
    order: number
    attr: formItemsType
    initialValues: formItemType
    modelName: string
}
type iconSelectConfigType = {component?: any; propKey?: string; iconList?: string[]}
type $globalType = {
    request?: any
    getSchema?: (schemaId: string) => Promise<schemaType>
    elements?: {[key: string]: formElement}
    iconSelectConfig?: iconSelectConfigType
    customElements?: {[key: string]: formElement}
}

type templateDataType = { name: string; schema: schemaType; id?: string }[]
type $optionsType = {
    request?: AxiosInstance
    getSchema?: (schemaId: string) => Promise<schemaType>
    elements?: { [key: string]: formElement }
    iconSelectConfig?: iconSelectConfigType
    customElements?: { [key: string]: formElement }
}
export type {
    anyObject,
    schemaType,
    formValuesType,
    contextType,
    changeItemType,
    formItemType,
    formItemsType,
    templateDataType,
    formElement,
    iconSelectConfigType,
    $globalType,
    $optionsType
}
