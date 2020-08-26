<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive"><slot name="icon"></slot></div>
    <div class="item-active-icon" v-show="isActive"><slot name="active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
	export default {
		name: "TabBarItem",
    props: {
			link: {
				type: String,
        required: true
      }
    },
    computed: {
			isActive() {
        return this.$route.path.indexOf(this.link) !== -1
        // $route这个哪个路由处于活跃就是哪个对象this.$route.path得到当前路由的path
        // indexOf（）这个方法它来从link中找有没有和path一样的，如果有的话就！==-1就为true，不是则相反
        // 现在的isActive就是由它this.$route.path.indexOf(this.link) !== -1判定的动态的结果FALSE或TRUE
      },
      activeStyle() {
				return this.isActive ? {'color': '#ff5777'} : {}
      }
    },
    methods: {
			itemClick() {
				this.$router.replace(this.link)
      }
    }
	}
</script>

<style scoped>
  #tab-bar-item {
    flex: 1;
  }

  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>