<template>
  <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef"> </Codemirror>
  <div>
    <el-button @click="handleExportJson">
      导出代码
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, defineProps } from 'vue'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import vueEditStr from './editorStr'
import {ElButton} from "element-plus";

const props = defineProps({
  schema: Object,
  readOnly: Boolean
})

const code = ref('')

const cmRef = ref()
const cmOptions = reactive({
  mode: 'text/javascript',
  lineNumbers: true, // Show line number
  smartIndent: true, // Smart indent
  indentUnit: 4, // The smart indent unit is 2 spaces in length
  foldGutter: true, // Code folding
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true, // Display the style of the selected row
  readOnly: props.readOnly
  // theme: 'neo'
})

onMounted(() => {
  code.value = vueEditStr(JSON.stringify(props.schema, null, 2))
  cmRef.value.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
const exportData = (data: string, fileName = `file.vue`) => {
  let content = 'data:text/csv;charset=utf-8,';
  content += data;
  const encodedUri = encodeURI(content);
  const actions = document.createElement('a');
  actions.setAttribute('href', encodedUri);
  actions.setAttribute('download', fileName);
  actions.click();
};

const handleExportJson = () => {
  console.log(code.value)
  exportData(code.value);
};
</script>
