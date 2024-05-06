<template>
<div>
  <h4 class="option-title" v-if="!Object.keys(current).length">未选中字段</h4>
  <template v-else>
    <schema-form :key="current.designKey" v-model="current" :schema="optionsSchema" />
  </template>
</div>
</template>
<script lang="ts" setup>
import {computed, inject} from "vue";
import {$current, $global} from "@/config/symbol";
import SchemaForm from "@/components/schemaForm.vue";

const {elements} = inject($global)
const {current} = inject($current)

const optionsSchema = computed(() => {
  const config = elements[current.value.component]
  if (config) {
    return {size: 'small', labelAlign: 'top', items: config.options }
  }
  return {size: 'small', labelAlign: 'top', items: []}
})
console.log(current)
</script>
<style lang="scss">
.option-title {
  margin-bottom: 10px;
}
</style>
