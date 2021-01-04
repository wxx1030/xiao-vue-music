import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
import 'common/js/umd'
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 300,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: "jsonp",
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 200,
    songstatus: 1
  })

  return jsonp(url, data, options)
}
export async function getSongVkey(songmid) {
  const url = '/api/getSongVkey'
  const data = Object.assign({}, {
    '-': 'getplaysongvkey9093791960314079',
    g_tk: 5381,
    sign: getSign( {"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7540375806","songmid":[songmid],"songtype":[0],"uin":"1642141862","loginflag":1,"platform":"20"}},"comm":{"uin":1642141862,"format":"json","ct":24,"cv":0}}),
    loginUin: 1642141862,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7540375806","songmid":[songmid],"songtype":[0],"uin":"1642141862","loginflag":1,"platform":"20"}},"comm":{"uin":1642141862,"format":"json","ct":24,"cv":0}}
  })
  return await axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getSign(data) {
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let count = Math.floor(Math.random() * 7 + 10);
  let sign = 'zza';
  for(let i = 0; i < count ; i++){
    sign += str[Math.floor(Math.random() * 36)];
  }
  sign += global.__sign_hash_20200305('CJBPACrRuNy7'+JSON.stringify(data));
  return sign
}