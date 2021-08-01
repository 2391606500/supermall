<template>
  <div class="cart">
  <nav-bar class='nav-bar'>
    <div slot='center'>购物车({{length}})</div>
  </nav-bar>
  <!-- 商品列表 -->
  <cart-list/>
  <!-- 底部汇总 -->
  <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种语法，把getters里的转换成computed
      // 对象写法：length:为这个页面上的名字，cartLength为getters里的名字,这样就可以把cartLength映射成length
      // 数组写法：两个名字一样
      //...mapGetters(['cartLength'])
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-weight: 500;
}
</style>
