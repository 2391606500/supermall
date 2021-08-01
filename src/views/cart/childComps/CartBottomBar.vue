<template>
  <div class="bottom-bar">
    <div class='check-content'>
<check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
<span>全选</span>
  </div>
  <div class="price">
    合计:{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算({{checkLength}})
  </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
components:{
  CheckButton

},
computed:{
  ...mapGetters(['cartList']),
  totalPrice(){
    return '￥'+this.cartList.filter(item=>{
      return item.checked
    }).reduce((preValue,item)=>{
      return preValue+item.price*item.count
    },0).toFixed(2)
  },
  checkLength(){
    return this.cartList.filter(item=>item.checked).length
  },
  isSelectAll(){
    //1.使用filter
   //return  !(this.cartList.filter(item=>!item.checked).length)
   if(this.cartList.length===0)return false
   //2.使用find
   //return !this.cartList.find(item=>!item.checked)
   //3.普通遍历
   for(let item of this.cartList){
     if(!item.checked){
       return false
     }
   }
   return true
  }
},
methods:{
  checkClick(){
    //console.log('---');
    if(this.isSelectAll){//全部选中
      this.cartList.forEach(item => item.checked=false   
      );
    }else{
      this.cartList.forEach(item=>item.checked=true)
    }
  },
  calcClick(){
    if(!this.isSelectAll){
      this.$toast.show('请选择购买的商品',2000)
    }
  }
}
}
</script>

<style scoped>
.bottom-bar{
  display: flex;
  height: 40px;
  /* background-color: red; */
  background-color: #eee;
  position: relative;
  line-height: 40px;
}
.check-content{
  display: flex;
  margin-left: 10px;
    align-items: center;
    width: 60px;
}
.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.price{
  flex:1;
  margin-left: 30px;
}
.calculate{
width: 90px;
background-color: red;
color:#eee;
text-align: center;
}
</style>