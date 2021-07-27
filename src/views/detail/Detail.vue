<template>
  <div id='detail'>
<detail-nav-bar  class='detail-nav'/>
<scroll class='content' ref="scroll">
  <detail-swiper :topImages="topImages"></detail-swiper>
<detail-base-info :goods="goods"></detail-base-info>
<detail-shop-info :shop="shop"></detail-shop-info>
<detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
<detail-param-info :paramInfo="paramInfo"></detail-param-info>
</scroll>
  </div>
</template>

<script>
import  DetailNavBar from './childComponents/DetailNavBar.vue'
import  DetailSwiper from './childComponents/DetailSwiper.vue'
import  DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import  DetailShopInfo from './childComponents/DetailShopInfo.vue'
import  DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import  DetailParamInfo from './childComponents/DetailParamInfo.vue'

import Scroll from '@/components/common/scroll/scroll'

import {getDetail,Goods,Shop,GoodsParam} from '@/network/detail.js'
export default {
  name:'Detail',
 components:{
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailGoodsInfo,
   DetailParamInfo 
 },
data(){
  return{
    iid:null,
    topImages:[],
    goods:{},
    shop:{},
    detailInfo:{},
    paramInfo:{}
  }
},
created(){
  //保存传入的iid
this.iid=this.$route.query.iid
//根据iid请求详细数据
getDetail(this.iid).then(res=>{
  console.log(res);
  const data=res.result
//获取顶部轮播数据
this.topImages=data.itemInfo.topImages
//获取商品信息
this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
//获取店铺信息
this.shop=new Shop(data.shopInfo)
//保存商品的详情数据
this.detailInfo=data.detailInfo
//获取参数信息
this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

})
},
methods:{
     imageLoad(){
this.$refs.scroll.refresh()
  }
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