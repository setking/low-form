import {computed, inject, onMounted, reactive, ref, watch} from "vue";
import {$global, $selectData} from "@/config/symbol";
import {debounce} from "lodash";

const useSelect = (props: any, emits: any) => {
    const selectData = inject($selectData)
    const selectVal = computed({
        get () {
            return props.modelValue
        },
        set (value) {
            emits('update:modelValue', value)
        }
    })
    const currentOptions = ref([])
    const loading = ref(false)
    const isMax = ref(false)
    onMounted(() => {
        const {mode, options} = props
        if (mode === "static") {
            currentOptions.value = options
            isMax.value = true
        }
    })
    watch(currentOptions, (newVal) => {
        const { autoSelectedFirst, modelValue, valueKey, multiple, sort } = props
        if (autoSelectedFirst && newVal.length && !modelValue?.length) {
            const firstVal = multiple ? [newVal[0][valueKey]] : newVal[0][valueKey]
            emits('update:modelValue', firstVal)
            selectChange(firstVal)
        }
        if(sort) {
            currentOptions.value = currentOptions.value.sort((a, b) => a.value - b.value)
        }
    })
    watch(
        () => props.options,
        (newVal) => {
            if (props.mode === 'static') {
                currentOptions.value = newVal
            }
        }
    )
    watch(
        () => props.mode,
        (newVal) => {
            currentOptions.value = props.options
        }
    )
    const selectChange = (val) => {
        const {valueKey, multiple, name} = props
        let valueData:{} = {}
        if (multiple) {
            //多选就过滤出vals对应的源数据
            valueData = currentOptions.value.filter((item) => {
                return val.includes(item[valueKey])
            })
        } else {
            //单选找到单项对应的源数据
            valueData = currentOptions.value.find((item) => item[valueKey] === val)
        }
        if (selectData) {
            selectData[name] = valueData
        }
        emits('onChangeSelect', selectData)
    }
    return {selectVal, selectChange, currentOptions, loading}

}
export  default useSelect
