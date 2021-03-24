<!--
 * @Author: CL
 * @Date: 2021-03-15 21:52:22
 * @LastEditTime: 2021-03-15 22:26:31
 * @Description: 首页
-->

<template>
  <div class="home-page">
    <!-- 这个router-view是展示分类和购物车的 -->
    <router-view></router-view>

    <!-- 底部tabbar -->
    <tabbar />
  </div>
</template>

<script>
import tabbar from '../components/TabBar';

export default {
  data(){
    return {
      
    }
  },

  components: {
    tabbar
  }
}
</script>

<style>

</style>
