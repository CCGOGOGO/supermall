<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      // return !this.cartList.filter(item => !item.checked).length
      if (this.cartList.length === 0) return false
      // 找到没有被选中的就返回false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick () {
      // 如果原来全选中，点击一次，全部不选中。如果原来全是不选中或者部分没选中，点击一次，全部选中
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false);
      } else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      if (!this.checkLength) {
        this.$toast.show('请选择购买的商品', 1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;

  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  border-top: 1px solid rgba(0,0,0,.1);
  -webkit-box-shadow:0 1px 4px rgba(0,0,0,.2);
  -moz-box-shadow:0 1px 4px rgba(0,0,0,.2);
  box-shadow: 0 1px 4px rgba(0,0,0,.2);

}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}

.check-content span {
  margin-left: 5px;
}

.price {
  margin-left: 25px;
  flex: 1;
}

.calculate {
  width: 28%;
  text-align: center;
  border-radius: 10px;
  background-color: rgb(206, 62, 91);
  color: #fff;
}
</style>
