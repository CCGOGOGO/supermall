import { debounce } from './utils'
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


