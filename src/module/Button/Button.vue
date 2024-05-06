<template>
  <el-button class="Button" v-bind="{...$attrs, ...props}" @click="onClick">{{name}}</el-button>
</template>
<script lang="ts" setup>
import {ElButton} from "element-plus";
import {inject} from "vue";
import {$formEvents} from "@/config/symbol";
const formEvents = inject($formEvents);
interface defaultProps {
  name: string,
  disabled: boolean,
  type: {
    type: string,
    default: 'primary' | string,
  },
  clickEvent: string,
  customEvent: void,
  color: string,
}
const props = defineProps<defaultProps>()
const onClick = () => {
  switch (props.clickEvent) {
    case "submitForm":
      formEvents.submit()
          break;
    case "resetForm":
      formEvents.resetFields()
      break;
    case "custom":
      formEvents.customEvent()
      break;
  }
}
</script>
