<template>
  <div id="formDesign">
    <div class="menu-list">
        <Menus />
    </div>
    <div class="render-component">
      <preview-options :previewSchemaContext="previewSchemaContext" />
      <page-configuration/>
    </div>
    <div class="component-option">
      <page-option />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Menus from './Menus/index.vue'
import PageConfiguration from './pageConfiguration/index.vue'
import PageOption from './pageOption/index.vue'
import PreviewOptions from './previewOptions.vue'
import type {anyObject, formItemType, schemaType, templateDataType} from "@/config/commonType";
import {computed, provide, ref, watchEffect} from "vue";
import {$current, $hoverKey, $methods, $schema} from "@/config/symbol";
import {recursionDelete} from "@/shared";
import {changeItems, copyItems, getCurrentByKey, setCurrentByKey} from "@/components/FormDesign/shared";
interface PropsPage {
  schema?: schemaType
  previewSchemaContext?: anyObject
  templates?: templateDataType
  omitMenus?:string[]
}

const props = defineProps<PropsPage>()
const emit = defineEmits<{onSave:[schema: schemaType]}>()
const currentKey = ref('')
const hoverKey = ref<string>('')
const currentSchema = ref<schemaType>({
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  items: []
})
const list = computed({
  get() {
    return currentSchema.value.items
  },
  set(value){
    currentSchema.value = {...currentSchema.value, items: value}
  }
})
const current = computed({
  get() {
    return getCurrentByKey(list.value, currentKey.value) || {}
  },
  set(value) {
    currentKey.value = value.designKey
    list.value = setCurrentByKey(currentSchema.value.items, value)
  }
})
watchEffect(() => {
  if(props.schema) {
    currentSchema.value = props.schema
  }
})
provide($schema, {
  schema: currentSchema,
  updateSchema: (json: schemaType) => (currentSchema.value = json)
})
provide($current, {current, updateCurrent: (data: formItemType) =>(current.value = data)})
provide($hoverKey, {hoverKey, updateHoverKey: (key: string) => (hoverKey.value = key)})
provide($methods,{
  onAdd: () => {list.value = changeItems(list.value)},
  handleDeleteItem:(item: formItemType) => {
    console.log('delete')
    list.value = recursionDelete(list.value, (ele) => ele.designKey !== item.designKey)
  },
  handleCopyItem: (ele:formItemType) => {list.value = copyItems(list.value, ele.designKey)},
  handleSave: () => {emit('onSave', currentSchema.value)}
})
</script>
<style lang="scss">
#formDesign {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  background-color: #eee;
  .menu-list {
    width: 18%;
    padding: 10px;
    background-color: #fff;
    position: relative;
    overflow: auto;
  }
  .render-component {
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    background-color: #fff;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }
  .component-option {
    width: 20%;
    overflow: auto;
    padding: 20px;
    background-color: #fff;
  }

  .editor {
    height: 70vh;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px;
  /*高宽分别对应横竖滚动条的尺寸*/
  background-color: #fff;
  // position: fixed;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: none;
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #ccc;
}
</style>
