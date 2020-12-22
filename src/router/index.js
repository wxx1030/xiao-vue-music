import Vue from 'vue'
import Router from 'vue-router'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer/singerDetail'
import Recommend from 'components/recommend/recommend'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
//push 
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/rank',
      component: Rank,
      // children: [
      //   {
      //     path: ':id',
      //     component: TopList
      //   }
      // ]
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/recommend',
      component: Recommend,
    }
  ]
})
