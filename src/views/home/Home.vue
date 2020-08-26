<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
      ></tab-control>
    <scroll 
    class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- 组件是不可以直接监听事件的。如果想要对组件监听事件要在末尾加上.native -->
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop') // 要加this,这样这里调用的才是methods里面的方法。不加的话调用的就是外面引进来的那个函数
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 2.取消全局事件的监听，后面确实是要传一个你监听事件函数里面的回调函数的
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // 事件监听相关
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll (position) {
      // 1.判断backtop是否显示
      this.listenShowBackTop(position)

      // 2.决定tab-control是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 实现上拉更新
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求
    getHomeMultidata () {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        // ...res.data.list这种三个点的语法，它做的是将res.data.list数据解析开来然后将数据一个一个的push到this.goods[type].list中
        this.goods[type].page += 1

        // 完成一次上拉加载更多之后
        this.$refs.scroll.finishPullUp()
    })
    }

  }
}
// 以上的this都是组件对象
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* vh -> viewport height（视口高度）， height: 100vh; 就是100%的视口 */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; 
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  /* 这个设置positive就是个工具人，因为z-index只对定位的元素起作用 */
  z-index: 9;
}


/* .content {
  height: calc(100% - 93px);
  css3中的一个语法，可视界面的100%-上下两个导航栏的高度就是中间我们要的高度
  overflow: hidden;
  margin-top: 44px;
} */
</style>
