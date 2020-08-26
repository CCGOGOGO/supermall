import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart (context, payload) {
    return new Promise ( (resolve, reject) => {
      // 1.用find方法来查找cartList中有没有你此次点击加入购物车传过来的product
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断
      if ( oldProduct ) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
    }
    })
  }
}