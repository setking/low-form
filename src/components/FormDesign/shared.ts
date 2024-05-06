import {cloneDeep} from "lodash";
import {getRandomId} from "@/shared";


export const getCurrentByKey = (items, key) => {
    return items.reduce((all, item) => {
        if (item.designKey === key) {
            return item;
        }
        if (item.children) {
            const res = getCurrentByKey(item.children, key);
            if (res) {
                return res;
            }
        }
        return all
    }, null)
}
export const setCurrentByKey = (items, value) => {
    return items.map((item) => {
        if (item.designKey === value.designKey){
            return value
        }
        if (item.children) {
            return {...item, children: setCurrentByKey(item.children, value)}
        }
        return item
    })
}
export const copyChildren = (children) => {
    return children.map((child) =>{
        const data = {...cloneDeep(child), designKey: `form-${getRandomId(4)}`,name: getRandomId(8)}
        if (child.children){
            data.children = copyChildren(child.children)
        }
        return data
    })
}
export const copyItems = (list: any, id: any) => {
    return list.reduce((all: any, current: any) => {
        if (current.children) {
            all.push({...current, children: copyItems(current.children, id)})
        } else {
            all.push(current)
        }
        if (current.designKey === id){
            const newItem = {
                ...cloneDeep(current),
                designKey: `form-${getRandomId(4)}`,
                name: getRandomId(8)
            }
            if (current.children){
                newItem.children = copyChildren(current.children)
            }
            if (current.label && !newItem.label.includes('copy')){
                newItem.label = newItem.label + 'copy'
            }
            all.push(newItem)
        }
        return all
    }, [])
}
export const changeItems = (items) => {
    return items.map((item) => {
        const config = item.initialValues || item
        const data = {
            ...config,
            designKey: config.designKey || `design-${getRandomId(4)}`,
            name: config.name || `form-${getRandomId(4)}`
        }
        if (config.children) {
            data.children = changeItems(config.children)
        }
        return data
    })
}
