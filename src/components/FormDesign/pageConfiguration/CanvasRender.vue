<template>
<div
class="canvas-item"
@click.stop="handleSelect(data)"
@mousemove.stop="handleHoverEnter"
@mouseleave="handleHoverLeave"
>
  <form-item v-bind="data" :props="checkProps(data.props)" design />
  <ul class="action-icon" v-if="designKey === current.designKey">
    <li @click.stop="handleDeleteItem(data)">
      <el-icon>
        <delete />
      </el-icon>
    </li>
    <li @click.stop="handleCopyItem(data)">
      <el-icon>
        <copy-document />
      </el-icon>
    </li>
  </ul>

</div>
</template>
<script lang="ts" setup>
import {computed, inject} from "vue";
import {$current, $hoverKey, $methods} from "@/config/symbol";
import {omit} from "lodash";
import {FormItem} from '@/components'
import {ElIcon} from "element-plus";
import { Delete, CopyDocument } from '@element-plus/icons'

const props = defineProps({
  data: Object
})
const {designKey, children} = props.data
const {current, updateCurrent} = inject($current)
const {hoverKey, updateHoverKey} = inject($hoverKey)
const {handleDeleteItem, handleCopyItem} = inject($methods)
const canvasItemClass = computed(() => ({
  'canvas-item': true,
  active: designKey === current.value.designKey,
  hover: designKey === hoverKey.value,
  mask: designKey === hoverKey.value && !children,
}))
const handleHoverEnter = () => {
  updateHoverKey(designKey)
}
const handleHoverLeave = () => {
  updateHoverKey(null)
}
const handleSelect = (element: any) => {
  console.log(element)
  updateCurrent(element)
}
const checkProps = (props:any) => {
  return omit(props, ['multiple', 'autoSelectedFirst', 'api'])
}
</script>
<style lang="scss">
.action-icon{
  position: absolute;
  right: 0;
  bottom: -1px;
  z-index: 20;
  color: #fff;
  list-style: none;
  padding: 1px;
  display: flex;
  li {
    padding: 2px 4px;
    background-color: var(--el-color-primary);
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-left: 3px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    line-height: 16px;
  }

}
.canvas-item{
  border: 2px solid transparent;
  margin-bottom: 5px;
  padding: 10px;
  position: relative;
  z-index: 2;
  &:before {
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px dashed #c0bdbd;
  }
}




</style>
