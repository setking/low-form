<template>
<el-tabs class="option-page">
  <el-tab-pane label="表单配置">
    <schema-form :schema="formOptions" v-model="form"></schema-form>
  </el-tab-pane>
  <el-tab-pane label="字段配置">
    <code-option />
  </el-tab-pane>
</el-tabs>
</template>
<script lang="ts" setup>
import {ElTabs, ElTabPane} from "element-plus";
import {SchemaForm} from "@/components";
import {computed, inject} from "vue";
import {$schema} from "@/config/symbol";
import formOptions from './formOptions';
import CodeOption from './codeOption.vue';

const {schema, updateSchema} = inject($schema)
const form = computed({
  get() {
    return schema.value
  },
  set(value) {
    updateSchema(value)
  }
})
</script>
