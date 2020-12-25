<template>
  <div class="recommend" ref="recommend">
    <Scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommendList.length">
          <slider>
            <!--slot-->
            <div v-for="item in recommendList" :key="item.key">
              <a :href="item.linkUrl">
                <img @load="loadImage" class="needsclick" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" :key="item.key" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.cover" width="60" height="60" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.title"></h2>
                <p class="desc">播放量：{{item.listen_num}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
//   import { playListMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  export default {
    // mixins: [playListMixin],
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    data() {
      return {
        recommendList: [],
        discList: [] // 热门歌单推荐列表
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // jsonp
      _getRecommend () {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommendList = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then(res => {
          if (res.code === ERR_OK) {
            console.log(res.recomPlaylist.data.v_hot)
            this.discList = res.recomPlaylist.data.v_hot
          }
        })
      },
      loadImage() {
        if (!this.checkedload) {
          this.$refs.scroll.refresh()
          this.checkedload = true
        }
      },
      // 歌单点击事件
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.content_id}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC',
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
