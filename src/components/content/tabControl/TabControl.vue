<template>
  <div class="tab-control">
<div v-for='(item,index) in titles' :key="index" class='tab-control-item' :class="{active:index===currentindex}" @click="itemclick(index)">
  <span>{{item}}</span>
</div>
  </div>
</template>

<script>
export default {
props:{
  titles:{
    type:Array,
    default(){
      return []
    }
  }
},
data(){
  return{
    currentindex:0
  }
},
methods:{
  itemclick(index){
    this.currentindex=index;
    this.$emit('tabclick',index)
  }
}
}
</script>

<style>
.tab-control{
  display: flex;
  text-align: center;
   height: 40px;
  line-height: 40px;
  font-size: 15px;
background-color: #fff;
}
.tab-control-item{
  flex:1;
}
.active{
  color:var(--color-high-text);
  
}
.active span{
border-bottom: 3px solid var(--color-high-text);
padding:5px
}
</style>