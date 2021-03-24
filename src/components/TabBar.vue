<!--
 * @Author: CL
 * @Date: 2021-03-15 22:21:46
 * @LastEditTime: 2021-03-19 14:57:46
 * @Description: 底部导航组件
 * 1. 其实应该把这些tab标题全部写成变量
-->

<template>
  <div class="tabbar-page">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/home/shopping" :badge="goodsTotal">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return {
      active: 0
    }
  },

  computed: {
    ...mapState({
      goodsTotal: state => state.goodsTotal
    })
  }
}
</script>

<style>

</style>
