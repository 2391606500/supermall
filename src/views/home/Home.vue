<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control v-show="isTabFixed" class="tab-control" ref="tabControl1" @tabclick='tabclick' :titles="['流行','新款','精选']"></tab-control>
         <scroll class='content' ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore"> 
           <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
    <recommend-view :recommends="recommends"/>
    <feature-view></feature-view>
    <tab-control  ref="tabControl2" @tabclick='tabclick' :titles="['流行','新款','精选']"></tab-control>
    <goods-list :goods="showGoods"></goods-list> 
     </scroll>
     <back-top @click.native='backClick' v-show='isShowBackTop'/>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import backTop from '@/components/content/backTop/backTop.vue'



import {getHomeMultidata,getHomeGoods} from '@/network/home';
import {debounce} from '@/common/utils.js'




 export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        scroll,
      backTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created() {
      // 1.请求多个数据
    this.getHomeMultidata()
      //2.请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('new')
       this.getHomeGoods('sell')
    },
      mounted(){
        //获取tabControl的offsetTop
        const refresh=debounce(this.$refs.scroll.refresh,5)
  this.$bus.$on('itemImgLoad',()=>{
         refresh()
       })

    },
    destroyed(){
     // console.log(1);
    },
    //进入
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    //离开
    deactivated(){
    this.saveY=this.$refs.scroll.getScrollY()
    },
    methods:{
      // 事件监听相关的方法
tabclick(index) {
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
        this.$refs.tabControl1.currentindex = index;
        this.$refs.tabControl2.currentindex = index;
      },
      backClick(){
//console.log(11);
       this.$refs.scroll.scrollTo(0,0,1000)
      },
      contentScroll(position){
        //1.判断backtop是否显示
      this. isShowBackTop=(-position.y)>1000
      //2.决定tabcontrol是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop
      },
      loadMore(){
//console.log(11);
this.getHomeGoods(this.currentType)
     this.$refs.scroll.finishPullUp()
      },
      swiperImageLoad(){
            this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },
       //3.监听item图片里加载完成
       
      // 网络请求相关代码
      // 1.请求多个数据
        getHomeMultidata(){getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
        },
      //2.请求商品数据
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+1
      })
      }
    },
    computed:{
showGoods(){
  return this.goods[this.currentType].list
},
    }
  }
</script>

<style scoped>
#home{
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color:#fff;
  /* position: fixed;
  left:0;
  right:0;
  top:0;
  z-index: 9; */
}
/* .content{
height: calc(100%-93px);
margin-top: 51px;
} */
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left:0;
  right:0;
}
.tab-control{
  position: relative;
  z-index: 10;
}
</style>
