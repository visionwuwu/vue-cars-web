<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      }
      return 'svg-icon'
    })

    return {
      iconName,
      svgClass
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
}
</style>
