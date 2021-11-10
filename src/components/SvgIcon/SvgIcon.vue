<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
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
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  display: block;
  fill: currentColor;/*此属性为更改svg颜色属性设置 */
  overflow: hidden;
}
.svg_icon_search{
	width: 24px;
  height: 24px;
	color: rgba(255,255,255,0.8)
}
</style>