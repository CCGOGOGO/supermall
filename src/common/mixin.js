import { debounce } from './utils'
import {POP, NEW, SELL} from "./const";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  mounted () {
    let newRefresh = debounce(this.$refs.scroll.refresh, 50)
    // 对监听事件里的回调函数进行保存
    this.itemImgListener = () => {
      newRefresh()
    }
    // 监听item图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop (position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}


