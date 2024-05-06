<template>
<div v-for="{title, children} in menuList" :key="title">
  <h4>{{title}}</h4>
  <draggable
  class="list"
  :list="children"
  :group="{name: 'formDesign', pull:'clone', put:false}"
  :sort="false"
  ghost-class="ghost"
  drag-class="drag"
  fallback-class="fallback"
  item-key="designKey"
  >
  <template #item="{element}">
    <li class="form-item-btn">
      <div>{{element.name}}</div>
    </li>
  </template>
  </draggable>
</div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable-es'
import {computed} from "vue";
import menus from "./menu";
import type {templateDataType} from "@/config/commonType";
interface propsData {
  templates?: templateDataType
  omitMenus?: string[]
}
const props = withDefaults(
    defineProps<propsData>(),
    {omitMenus: () => []}
)
const menuList = computed(() => {
  return menus.map((item) => (
      {
        ...item,
        children: item.children.filter(
            (ele) => !props.omitMenus.includes(ele.initialValues.component)
        )
      }
  ))
})

</script>
<style lang="scss">
.form-item-btn{
  list-style: none;
}
</style>
