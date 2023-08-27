<template>
  <div 
    v-if="dragAndDrop.dragNode !== null && (enableDragNodeOut === true || dragAndDrop.status === DND_STATUS.INTERNAL) && dragAndDrop.clientX !== null"
    class="twtree-drag-image-wrapper"
    :style="{
      '--mousex': dragAndDrop.clientX + 'px',
      '--mousey': dragAndDrop.clientY + 'px',
      '--dragNodeFontSize': dragAndDrop.dragNode.style.fontSize,
    }"> 
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    dragAndDrop: {
      type: Object,
      required: true
    },
    DND_STATUS: {
      type: Object,
      required: true
    },
    enableDragNodeOut: {
      type: Boolean,
      required: true
    }
  },
}
</script>

<style scoped>
.twtree-wrapper .twtree-drag-image-wrapper {
  display: block;
  position: fixed;
  z-index: 11;
  left: calc(var(--mousex) + var(--dragImageOffsetX));
  top: calc(var(--mousey) + var(--dragImageOffsetY));
  font-size: var(--dragNodeFontSize);
  text-indent: 0;
}
</style>