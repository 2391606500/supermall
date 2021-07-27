<template>
  <div class='wrapper' ref='wrapper'>
  <div class="content">
      <slot></slot>
  </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
data(){
  
  return {
    scroll:null
  }
},
props:{
  probeType:{
    type:Number,
    default:0
  },
  pullUpLoad:{
    typr:Boolean,
    default:false
  }
},
methods:{
scrollTo(x,y,time=500){
this.scroll && this.scroll.scrollTo(x,y,time)
},
finishPullUp(){
 this.scroll &&  this.scroll.finishPullUp()
},
getScrollY(){
  return this.scroll?this.scroll.y:0
},
refresh(){
 this.scroll &&  this.scroll.refresh()
 //console.log(1);
}
},
mounted(){
  //创建BScroll对象
this.scroll=new BScroll(this.$refs.wrapper,{
  click:true,
  probeType:this.probeType,
  pullUpLoad:this.pullUpLoad
  // observeDom:true,
  // observeImage:true
})
//监听滚动的位置
if (this.probeType===2||this.probeType===3){
  this.scroll.on('scroll',(position)=>{
  //console.log(position);
  this.$emit('scroll',position)
})
}
//监听上拉事件
if(this.pullUpLoad){
  this.scroll.on('pullingUp',()=>{
  this.$emit('pullingUp')
})
}
}
}
</script>

<style>

</style>