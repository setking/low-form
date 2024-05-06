<template>
  <form-item v-for="item in formItems" :key="item.name" v-bind="item" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import FormItem from './FormItem.vue'
import type {formItemsType} from "@/config/commonType";

defineProps<{
  formItems: formItemsType
}>()
</script>
