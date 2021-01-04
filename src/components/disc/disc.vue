<template>
<!-- 歌单列表 -->
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/musicList/musicList'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongVkey  } from 'api/singer'
export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  components: {
    MusicList
  },
  created() {
    // 获取歌单的歌曲列表
    this._getSongList()
  },
  methods: {
    // 获取歌单的歌曲列表
    _getSongList() {
      // 刷新的时候获取不到数据，跳转推荐页面
      if (!this.disc.content_id) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.content_id).then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          console.log(res.code)
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    // 格式化获取到的列表
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          getSongVkey(musicData.songmid).then((res) => {
            const purl = res.req_0.data.midurlinfo[0].purl
            if (musicData.songid && musicData.albummid && purl) {
              ret.push(createSong(musicData,purl))
            }
          })
        }
      })
      return ret
    }
  },
  computed: {
    // 计算歌单页面的标题
    title() {
      return this.disc.title
    },
    // 计算歌单页面的背景图
    bgImage() {
      return this.disc.cover
    },
    ...mapGetters([
      'disc'
    ])
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition all 0.3
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>