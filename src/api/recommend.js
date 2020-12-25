import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
export function getDiscList() {
  const url = '/api/getDiscList'
  // const data = Object.assign({}, {
  //   g_tk: 5381,
  //   notice: 0,
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   platform: 'yqq',
  //   hostUin: 0,
  //   sin: 0,
  //   ein: 29,
  //   sortId: 5,
  //   categoryId: 10000000,
  //   needNewCode: 0,
  //   rnd: Math.random(),
  //   format: 'json'
  // })
  const data = Object.assign({}, {
    '-': 'recom6551921106024681',
    g_tk: 995914747,
    sign: 'zzapru87daves5ff15c4441255ee9ef959d8dacccc3f88',
    loginUin: 1642141862,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"newsong.NewSongServer","method":"get_new_song_info","param":{"type":5}},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":1,"sin":0,"num":20}},"new_album_tag":{"module":"newalbum.NewAlbumServer","method":"get_new_album_area","param":{}},"toplist":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"focus":{"module":"music.musicHall.MusicHallPlatform","method":"GetFocus","param":{}}}

  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// export function getDiscList() {
//   // const url = '/api/getDiscList'
//   // const url = 'https://c.y.qq.com/splcloid/fcgi-bin/fcg_get_diss_by_tag.fcg'
//   const url ="https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg"

//   const data = Object.assign({},commonParams, {
//     g_tk: 5381,
//     picmid: 1,
//     rnd: Math.random(),
//     g_tk_new_20200303: 5381,
//     loginUin: 0,
//     hostUin: 0,
//     format: 'jsonp',
//     inCharset: 'utf8',
//     outCharset: 'utf-8',
//     notice: 0,
//     platform: 'yqq',
//     needNewCode: 0,
//     categoryId: 10000000,
//     sortId: 5,
//     sin: 0,
//     ein: 19,
//   })

//   return jsonp(url, data, options)
// }

export function getSongList(disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    format: 'json',
    hostUin: 0,
    needNewCode: 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
