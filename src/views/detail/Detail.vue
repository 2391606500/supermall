<template>
  <div id='detail'>
<detail-nav-bar  class='detail-nav' @titleClick='titleClick' ref='detail'/>
<scroll class='content' ref="scroll" :probe-type="3" @scroll="detailscroll">
  <detail-swiper :topImages="topImages"></detail-swiper>
<detail-base-info :goods="goods"></detail-base-info>
<detail-shop-info :shop="shop"></detail-shop-info>
<detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
<detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
<detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
<goods-list ref="recommend" :goods="recommends"></goods-list>
</scroll>
<back-top @click.native='backClick' v-show='isShowBackTop'/>
<detail-bottom-bar @addToCart="addToCart"/>
<!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import  DetailNavBar from './childComponents/DetailNavBar.vue'
import  DetailSwiper from './childComponents/DetailSwiper.vue'
import  DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import  DetailShopInfo from './childComponents/DetailShopInfo.vue'
import  DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import  DetailParamInfo from './childComponents/DetailParamInfo.vue'
import  DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'


import Scroll from '@/components/common/scroll/scroll'
// import Toast from '@/components/common/toast/Toast'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import {getDetail,Goods,GoodsParam,getRecommend} from '@/network/detail.js'
import {itemListenerMixin,backTopMixin} from '@/common/mixin'
import {debounce} from '@/common/utils.js'

import {mapActions} from 'vuex'

export default {
  name:'Detail',
 components:{
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailGoodsInfo,
   DetailParamInfo,
  DetailCommentInfo,
  GoodsList,
  DetailBottomBar,
  // Toast,
 },
 mixins:[itemListenerMixin,backTopMixin],
data(){
  return{
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:[],
    themeTopYs:[],
    getThemeTopYs:null,
    positionY:0,
    currentIndex:0,
    // message:'',
    // show:false
  }
},
created(){
  //保存传入的iid
this.iid=this.$route.query.iid
//根据iid请求详细数据
getDetail(this.iid).then(res=>{
  //console.log(res);
  const data=res.result
//获取顶部轮播数据
this.topImages=data.itemInfo.topImages
//获取商品信息
this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
//获取店铺信息
this.shop=data.shopInfo
//保存商品的详情数据
this.detailInfo=data.detailInfo
//获取参数信息
this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
//获取评论信息
if(data.rate.cRate!==0){
  this.commentInfo=data.rate.list[0]
}
//根据最新的数据，对应的dom已经被渲染出来
//但是图片没有加载完（获取到的offsetTop不包含其中的图片的）
// this.$nextTick(()=>{
//   this.themeTopYs=[]
//   this.themeTopYs.push(0)
//   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
//   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
//   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
//   console.log(this.themeTopYs);
// })
})
//请求推荐数据
getRecommend().then(res=>{
  //console.log(res);
  this.recommends=res.data.list
})
//给getThemeTopYs赋值
this.getThemeTopYs=debounce(()=>{
  this.themeTopYs=[]
  this.themeTopYs.push(0)
  this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  this.themeTopYs.push(Number.MAX_VALUE)
  //console.log(this.themeTopYs);
},500)
},
methods:{
  ...mapActions(['addCart']),
     imageLoad(){
       //console.log(1);
    this.refresh()
 this.getThemeTopYs()
  },
  titleClick(index){
    //console.log(index);
    this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
  },
  detailscroll(position){
this.listenShowBackTop(position)
   // console.log(position);
   //获取y值
   const positionY=-position.y
   //positionY和主题中的值进行对比
   let length=this.themeTopYs.length;
   for(let i=0;i<length-1;i++){
    //  if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
    //    console.log(i);
    // }
    if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
    // if(this.currentIndex!==i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]) || (i===length-1&&positionY>=this.themeTopYs[i]))){
    //   this.currentIndex=i
    //   this.$refs.detail.currentIndex=this.currentIndex
    //console.log(this.currentIndex);
     this.currentIndex=i
     this.$refs.detail.currentIndex=this.currentIndex
   }
   }
  },
  addToCart(){
    //console.log("------");
    // 获取购物车需要展示的信息
  const product={}
  product.image=this.topImages[0];
  product.title=this.goods.title;
  product.desc=this.goods.desc;
  product.price=this.goods.realPrice;
  product.iid=this.iid;
  //将商品添加到购物车里
  //this.$store.commit('addCart',product)
  // this.$store.dispatch('addCart',product).then(res=>{
  //   console.log(res);
  // })
  //添加到购物车成功
  this.addCart(product).then(res=>{
    //普通方式
  //   console.log(res);
  // this.show=true;
  // this.message=res;
  // setTimeout(()=>{
  //   this.show=false;
  //   this.message=''
  // },1500)
//自己封装toast插件
  this.$toast.show(res,2000)
  //console.log(this.$toast);
  })
  }
},
destroyed(){
   //2.取消全局事件 的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
}
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
   overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 0;
  left:0;
  right:0;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>