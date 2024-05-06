<template xmlns="http://www.w3.org/1999/html">
  <el-form
  :model="formValues"
  :label-position="schema.labelAlign"
  :size="schema.size"
  :disabled="schema.disabled"
  :hide-required-fields="schema.hideRequiredFields"
  ref="formRef"
  v-bind="$attrs"
  >
    <form-render v-if="!design" :formItems="formItems" />
    <form-item
    v-if="footer && !design"
    v-bind="footerSchema"
    :style="{paddingLeft: schema.labelWidth + 'px'}"
    />
    <slot />
  </el-form>
</template>
<script lang="ts" setup>
import {ElForm} from "element-plus";
import type {FormInstance} from 'element-plus'
import type {anyObject, schemaType} from "@/config/commonType";
import {computed, inject, provide, reactive, ref, watch} from "vue";
import {$formEvents, $formValues, $initialValues, $schema, $selectData} from "@/config/symbol";
import {cloneDeep, merge} from "lodash";
import {deepParse, getDataByPath, handleLinkages, setDataByPath} from "@/shared";
import FormItem from "./FormItem.vue";
import FormRender from "./FormRender.vue";
import footerSchema from "@/shared/footerSchema";
interface PropsPage {
  modelValue?: anyObject
  schema: schemaType
  schemaContext?: anyObject
  design?: boolean
  footer?: boolean
}
defineOptions({
  name: 'SchemaForm'
})
const props = defineProps<Readonly<PropsPage>>()

const emit = defineEmits<{
  'update:modelValue': [values: anyObject]
  onChange: [values: anyObject]
  onFinish: [values: anyObject]
  onFinishFailed: [e: anyObject]
}>()
const formRef = ref<FormInstance>()
const selectData = reactive({})
const initialValues = reactive({})
const stateFormValues = ref({})
const formValues = computed({
  get() {
    return props.modelValue || stateFormValues.value
  },
  set(values) {
    emit('update:modelValue', values)
    stateFormValues.value = values
  }
})
const context = computed(() => ({
      $values: formValues.value,
      $selectData: selectData,
      $initialValues: initialValues,
      ...props.schemaContext
}))
const formItems = computed(() => deepParse(props.schema.items || [], context.value))
const currentSchema = computed(() => props.schema)
const validate = () => formRef.value?.validate()
const submit = async () => {
  try{
    await validate()
    emit('onFinish', formValues.value)
    return formValues.value
  } catch (err: any) {
    emit('onFinishFailed', err)
    return Promise.reject(err)
  }
}
const getFormValues = () => ({...formValues.value})
const setFormValues = (values: anyObject) => {
  formValues.value = {...formValues.value, ...values}
}
const resetFields = (name: string[]) => {
  if (name) {
    let temp = cloneDeep(formValues.value)
    name.forEach((item) => {
      temp = setDataByPath(temp, item, getDataByPath(initialValues, item))
    })
    formValues.value = temp
  } else {
    formValues.value = initialValues
  }
}
watch(formValues,(newVal, oldVal) => {
  emit('onChange', newVal)
  handleLinkages({newVal, oldVal, formValues, formItems: formItems.value})
},
    {deep: true})
watch(initialValues, (newVal) => {
  formValues.value = merge(formValues.value, newVal)
})
provide($schema, currentSchema)
provide($formValues,{
  formValues,
  updateFormValues: (values: anyObject) => (formValues.value = values)
})
provide($selectData, selectData)
provide($formEvents, {submit, validate, getFormValues, setFormValues, resetFields})
provide($initialValues, {
  initialValues,
  updateInitialValues: (values: anyObject) => Object.assign(initialValues, values)
})
defineExpose({submit, validate, getFormValues, setFormValues, resetFields, context})
</script>
