<template>
  <schema-form design class="canvas" :schema="schema">
    <div class="tip" v-if="!schema.items.length">
      <div class="text">
        请拖拽组件完成组装表单！
      </div>
    </div>
    <draggable
    style="height: 100%"
    :list="schema.items"
    :group="{name: 'formDesign', pull: true, put: true}"
    itemKey="name"
    chooseClass="choose"
    ghost-class="ghost"
    @add="onAdd"
    drag-class="drag"
    handle=".canvas-move"
    :animation="300"
    force-fallback
    >
      <template #item="{element}">
        <canvas-render v-if="element.designKey" :data="element"/>
      </template>
    </draggable>
  </schema-form>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable-es'
import {inject} from "vue";
import {$methods, $schema} from "@/config/symbol";
import CanvasRender from './CanvasRender.vue'
import SchemaForm from '../../schemaForm.vue'

const {schema} = inject($schema)
const {onAdd} = inject($methods)
</script>
