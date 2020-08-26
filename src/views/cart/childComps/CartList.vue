<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  background-color: #fff;
  height: 100vh;
  /* 让高度为100的视图高度，这样下面的100%是相对父级高度的，这样下面才不会错 */
}

.content {
  height: calc( 100% - 44px - 49px - 40px );
  overflow: hidden;
}
</style>
