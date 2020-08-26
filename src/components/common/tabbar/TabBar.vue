<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: "TabBar"
	}
</script>

<style scoped>
  #tab-bar {
    /* 本身的样式 */
    background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid rgba(0,0,0,.1);
    -webkit-box-shadow:0 1px 4px rgba(0,0,0,.2);
    -moz-box-shadow:0 1px 4px rgba(0,0,0,.2);
    box-shadow: 0 1px 4px rgba(0,0,0,.2);

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 利用flex进行布局 */
    display: flex;
    text-align: center;
  }
</style>


