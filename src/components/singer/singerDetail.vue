<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getSingerDetail, getSongVkey  } from 'api/singer'
  import { ERR_OK } from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/musicList/musicList'
  export default {
    data() {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log(this.singer)
      this._getDetail()
    },
    methods: {
      _getDetail() {
        // 刷新当前页回退到singer
        if (!this.singer.id) {
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      // 格式化抓取的数据
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item, index) => {
          let { musicData } = item
          // if (musicData.songid && musicData.albummid) {
          //   console.log(musicData)
          //   ret.push(createSong(musicData))
          // }
          // console.log(musicData)
          getSongVkey(musicData.songmid).then((res) => {
            const purl = res.req_0.data.midurlinfo[0].purl
            // console.log(songVkey)
            if (musicData.songid && musicData.albummid && purl) {
              ret.push(createSong(musicData, purl))
            }
          })
        })
        return ret
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
