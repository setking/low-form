import type {
    anyObject,
    contextType,
    formItemsType,
    formItemType,
    formValuesType,
    schemaType
} from "@/config/commonType";
import {cloneDeep, isArray, isEqual, isPlainObject, isString} from "lodash";
type handleLinkagesType = (obj: {
    newVal: Object,
    oldVal: Object,
    formValues: anyObject,
    formItems: formItemsType
}) => void
export const getDataByPath = (obj: anyObject, path: string) => {
    const keys = path.split('.')
    let result = obj
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key]
        } else {
            return undefined
        }
    }
    return result
}
export const setDataByPath = (object: formValuesType, path: string, value:any) => {
    const cloneObj = cloneDeep(object)
    const pathArr = path.split('.')
    function update(obj: formValuesType, pathArr: string[], value: any) {
        if (pathArr.length === 1) {
            obj[pathArr[0]] = value
            return
        }
        const currentKey = pathArr.shift()
        if (currentKey) {
            if (!obj[currentKey]) {
                obj[currentKey] = {}
            }
            update(obj[currentKey], pathArr, value)
        }
    }
    update(cloneObj, pathArr, value)
    return cloneObj
}
export const templateParse = (str: string, context: contextType) => {
    if (!str) { return str }
    if (typeof str !== 'string') {return str}
    const template = str.match(/{{(.+?)}}/)
    if (template) {
        try {
            const parse = new Function(Object.keys(context).join(','), 'return' + template[1])
            return parse(...Object.values(context))
        } catch (err) {
            return str
        }
    } else {
        return str
    }
}

export const recursionDelete = (
    items: formItemsType,
    callback:(item: formItemType
    ) => boolean): formItemsType => {
    const data = items.filter(callback)
    return data.map((item) => {
        if (item.children) {
            return {
                ...item,
                children: recursionDelete(item.children, callback)
            }
        }
        return item
    })
}
export const getRandomId = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let randomId = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        randomId += characters.charAt(randomIndex)
    }
    return randomId
}
export const deepParse = (prop: any, context: contextType): any => {
    const $values = context.$values
    if (isString(prop)) {
        return templateParse(prop, context)
    }
    if (isPlainObject(prop)){
        return Object.keys(prop).reduce((all, key) => {
            const itemContext = {...context}
            if (prop.name && $values) {
                itemContext.$val = getDataByPath($values, prop.name)
                itemContext.$select = context.$selectData[prop.name]
            }
            return {...all, [key]: deepParse(prop[key], itemContext)}
        }, {})
    }
    if (isArray(prop)) {
        return prop.map((item) => {
            return deepParse(item, context)
        })
    }
    return prop
}
export const handleLinkages: handleLinkagesType = ({newVal, oldVal ,formValues,formItems }) => {
    for (const item of formItems) {
        const newValue = getDataByPath(newVal, item.name)
        const oldValue = getDataByPath(oldVal, item.name)
        if (item.change && !isEqual(newValue, oldValue)) {
            let temp = cloneDeep(formValues.value)
            item.change.forEach(({target, value}) => {
                temp = setDataByPath(temp, target, value)
            })
            formValues.value = temp
        }
        if (item.children && item.component !== 'FormList') {
            handleLinkages({
                newVal,
                oldVal,
                formValues,
                formItems: item.children
            })
        }
    }
}
export const defaultSchema: schemaType = {
    labelWidth: 150,
    labelAlign: 'right',
    size: 'default',
    items: []
}
export const isRegexString = (str: string) => {
    const regexMetaCharacters = /[.*+?^${}()|[\]\\]/
    return regexMetaCharacters.test(str)
}
