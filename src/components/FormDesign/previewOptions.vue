<template>
  <div class="view-list">
    <div class="view-btn">
    <div class="view-btn-left">
<!--      <el-button size="small" @click="handlePreviewExec">预览JSON脚本</el-button>-->
      <el-button size="small" @click="handlePreviewVue">生成代码</el-button>
      <el-button size="small" type="primary" @click="handlePreviewForm">预览表单</el-button>
    </div>
    <div class="view-btn-right">
      <el-button size="small" type="danger" @click="handleClear">清空</el-button>
      <el-button size="small" @click="handleSave" type="primary">保存</el-button>
    </div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="预览脚本"
        width="70%"
        center
        destroy-on-close
        top="10vh"
    >
      <json-editor-vue
          v-if="dialogType === 'exec'"
          class="editor"
          v-model="json"
          currentMode="code"
          :modeList="['text', 'view', 'tree', 'code', 'form']"
          :options="{ search: true, history: true }"
          language="zh"
          @blur="onBlur"
      />
      <CodeMirror v-if="dialogType === 'vue'" :schema="schema" readOnly />
      <schema-form
          v-if="dialogType === 'form'"
          v-model="form"
          :schema="schema"
          ref="formRef"
          :schemaContext="previewSchemaContext"
          :style="{ minHeight: '200px' }"
      />
      <template #footer v-if="dialogType === 'form'">
        <el-button @click="handleSubmit" type="primary">模拟提交</el-button>
        <el-button @click="formRef.resetFields()" type="primary">重置</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import {ElButton, ElDialog} from "element-plus";
import {computed, inject, ref} from "vue";
import {$global, $methods, $schema} from "@/config/symbol";
import {CodeMirror} from '@/components/'
import {changeItems} from "@/components/FormDesign/shared";
import JsonEditorVue from 'json-editor-vue3'

defineProps({
  previewSchemaContext: {
    type: Object,
    default: () => ({})
  }
})
const {schema, updateSchema} = inject($schema)
const { handleSave } = inject($methods)
const { elements } = inject($global)
const formRef = ref(null)

const form = ref({})
const formContext = computed(() => formRef.value?.context)

const dialogVisible = ref(false)

const dialogType = ref('')
const json = computed({
  get() {
    return schema.value
  },
  set(value) {
    updateSchema(value)
  }
})
const handlePreviewExec = () => {
  dialogVisible.value = true
  dialogType.value = 'exec'
}
const handlePreviewForm = () => {
  form.value = {}
  dialogVisible.value = true
  dialogType.value = 'form'
}
const handlePreviewVue = () => {
  dialogVisible.value = true
  dialogType.value = 'vue'
}
const handleSubmit = () => {
  formRef.value
      .submit()
      .then((values) => {
        alert(JSON.stringify(values, null, 2), '模拟提交')
      })
      .catch((e) => console.log(e))
}
const handleClear = () => {
  schema.value = { ...schema.value, items: [] }
}
const onBlur = (editor) => {
  schema.value = { ...schema.value, items: changeItems(schema.value.items) }
  editor.repair()
}

</script>
<style lang="scss">
.view-list {
  .view-btn{
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

</style>
