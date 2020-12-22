<template>
<!-- 歌手页面 -->
<scroll class="list-view"
        :data="data" 
        ref="listview" 
        :listenScroll="listenScroll"
        :probeType="probeType"
        @scroll="scroll"
>
  <ul>
    <li v-for="(group, index) in data" :key="index" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <ul>
        <li  @click="selectItem(item)" v-for="(item, index1) in group.items" :key="index1" class="list-group-item">
          <img v-lazy="item.avatar" class="avatar">
          <span >{{item.name}}</span>
        </li>
      </ul>
    </li>
  </ul>
  <!-- A-Z -->
  <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
    <ul>
      <li v-for="(item, index) in shortcutList" 
          :key="index" 
          :data-index="index" 
          class="item" 
          :class="{'current' : currentIndex === index}"
      >
        {{item}}
      </li>
    </ul>
  </div>
  <div class="loading-container" v-show="!data.length">
    <loading></loading>
  </div>
  <div class="list-fixed" v-show="fixedTitle" ref="fixed">
    <h1 class="fixed-title"> {{fixedTitle}} </h1>
  </div>
</scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      type: Array,
      default: [],
      probeType: 3
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    console.log(Math.PI)
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    // 返回右侧快速入口A-Z
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    // 计算标题显示
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    // 点击
    onShortcutTouchStart(e) {
      // getData(e.target, 'index') 获取点击的元素的index值
      let anchorIndex = getData(e.target, 'index')
      // 获取滑动起点的Y坐标值 pageY鼠标指针位置相对于当前窗口的 y 坐标
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      // console.log(1,firstTouch.pageY, anchorIndex)
      this._scrollTo(this.touch.anchorIndex)
    },
    // 移动
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 移动的距离 / 每个元素的高度 = 移动了几个元素   "| 0" 相当于Math.floor() 返回小于或等于一个给定数字的最大整数
      let distance = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + distance
      this._scrollTo(anchorIndex)
    },
    // 给父组件调用的，重置底部bottom
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      // console.log(pos)
      this.scrollY = pos.y
    },
    // 移动到
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 计算每个分组的所在的高度
    _calulateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      // console.log(this.listHeight)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        // clientHeight包括元素高度、内边距，不包括边框和外边距
        height += item.clientHeight
        this.listHeight.push(height)
        //  console.log(this.listHeight)
      }
      // console.log(this.listHeight)
    },
    // 派发事件，让外部知道点击的是哪个,子传父
    sllectItem(item) {
      this.$emit('select', item)
    },
    selectItem(item) {
      this.$emit('select', item)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calulateHeight()
      }, 20)
    },
    // // 监听scrollY 获取currentIndex 根据分组所在的高度确定是第几个分组
    scrollY(newY) {
      // console.log(newY)
      const listHeight = this.listHeight
      // 当滚动到顶部继续往下拉，newY>0
      if (newY >= 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY >= height1 && -newY < height2)) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          // 滑动时标题栏呗覆盖处理
          this.diff = height2 + newY
          // console.log(this.diff)
          return
        }
      }
      this.currentIndex = 0
    },
    // 监听diff
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px, 0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"

  .list-view
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          margin-right: 10px 
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
