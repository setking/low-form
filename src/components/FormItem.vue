<template>
  <template v-if="design || !hidden">
    <div v-if="config.type === 'layout'" :style="itemStyle">
      <component
      :is="config.component"
      :design="design"
      :name="name"
      :props="props"
      :children="children"
      />
    </div>
    <div v-else-if="config.type === 'assist'" :style="itemStyle">
      <component :is="config.component" v-bind="props" />
    </div>
    <el-form-item
    v-else
    id="form-item"
    :style="itemStyle"
    :key="name"
    :props="name"
    :label-width="hideLabel ? '0' : schema.labelWidth"
    :rules="computeRules"
    :class="thisProps.class"
    >
      <template #label v-if="!hideLabel">
       <div class="form-item-label">
         <div :style="schema.labelBold && 'font-weight: bold'">{{label}}</div>
       </div>
      </template>
      <component
          :is="config.component"
          :disabled="schema.disabled"
          :size="schema.size"
          v-bind="formItemProps"
          v-model:[config.modelName]="value"
          :design="design"
        />
    </el-form-item>
  </template>
</template>
<script lang="ts" setup>
import type {formItemType, changeItemType, $globalType, schemaType, anyObject} from "@/config/commonType";
import {computed, inject, onMounted, ref} from "vue";
import {$formValues, $global, $initialValues, $schema} from "@/config/symbol";
import defaultElements from '@/module'
import {defaultSchema, getDataByPath, isRegexString, setDataByPath} from "@/shared";
import {isString} from "lodash";
import {ElFormItem} from "element-plus";

type FormItemProps = {
  label?: string
  name: string
  component: string
  required?: boolean
  props?: object
  initialValue?: any
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
const thisProps = defineProps<FormItemProps>()
const {elements = {}} = inject<$globalType>($global, {elements: defaultElements})
const schema = inject<schemaType>($schema, defaultSchema)
const {formValues, updateFormValues} = inject($formValues, {
  formValues: ref({}),
  updateFormValues: (values: anyObject) => {
    console.log(values)
  }
})
const {initialValues, updateInitialValues} = inject($initialValues, {
  initialValues: {},
  updateInitialValues: (values: anyObject) => {
    console.log(values)
  }
})
const value = computed({
  get() {
    return getDataByPath(formValues.value, thisProps.name)
  },
  set(value) {
    const newValue = setDataByPath(formValues.value, thisProps.name, value)
    updateFormValues(newValue)
  }
})
const itemStyle = computed(() => ({
  marginBottom: thisProps.design ? 0 : '18px',
  ...thisProps.style
}))
const computeRules = computed(() => {
  const {rules, required} = thisProps
  const ruleData = []
  if (required) {
    ruleData.push({required: true, message: '该字段是必填项', trigger: 'blur'})
  }
  if (rules) {
    const ruleParse = rules.map(({type, message, tirgger, customReg}) => {
      const ruleDef = {
        message,
        tirgger
      }
      if (['email', 'url'].includes(type)) {
        return {...ruleDef, type}
      }
      if (type === 'custom') {
        return {
          ...ruleDef,
          pattern: customReg
        }
      }
      if (isRegexString(type)) {
        return {
          ...ruleDef,
          pattern: type
        }
      }
      return  {}
    })
    return [...ruleData, ...ruleParse]
  }
  return ruleData
})
const currentComponent = computed(() => {
  if(isString(value.value) && /^{{\s*(.*?)\s*}}$/.test(value.value)) {
    return 'Input'
  }
  return thisProps.component
})
const config = computed(() => {
  return elements[currentComponent.value] || []
})
const formItemProps = computed(() => {
  const initProps: anyObject = {
    ...thisProps.props,
    name: thisProps.name
  }
  if (thisProps.children) {
    initProps.children = thisProps.children
  }
  return initProps
})
onMounted(() => {
  if (!value.value && thisProps.initialValue !== undefined) {
    const newInitialValues = setDataByPath(initialValues, thisProps.name, thisProps.initialValue)
    updateInitialValues(newInitialValues)
  }
})
</script>
<style lang="scss" scoped>
#form-item {
  .form-item-label {
    display: flex;
    position: relative;
    .ico {
      margin-left: 3px;
      font-size: 15px;
      position: relative;
      .el-tooltip__trigger {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
}
</style>
