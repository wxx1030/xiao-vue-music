<template>
    <div class="singer">
      歌手
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
    data() {
      return {
        singers: []
      };
    },
    created() {
      this._getSingerList()

    },
    mounted() {

    },
    methods: {
      _getSingerList () {
        getSingerList().then((res)=> {
          if (res.code === ERR_OK) {
            this.singers = res.data.list
            console.log(this._normalizeSinger(this.singers))
          }
        })

      },
      // 格式化歌手数据
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          // key 为歌手的姓 => 字母
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        console.log(map)
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }

        // 排序  charCodeAt(0) 方法可返回指定位置的字符的 Unicode 编码
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }

    }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.singer
  position: fixed
  top: 88px
  bottom : 0
  width : 100%
  // color : $color-text-l

</style>