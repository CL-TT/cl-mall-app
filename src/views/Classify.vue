<!--
 * @Author: CL
 * @Date: 2021-03-15 21:54:49
 * @LastEditTime: 2021-03-22 17:11:15
 * @Description: 分类页面
-->

<template>
  <div class="classify-page">
    <!-- 搜索按钮,跳转到搜索页面 -->
    <router-link tag="div" class="search-btn" to="/search">
      <van-icon name="search" />
      <div>荔枝水果</div>
    </router-link>

    <!-- 一级导航写成一个组件 -->
    <first-nav />
 
    <!-- 二级导航，侧边栏 -->
    <template v-if="isShowContent">
      <side-nav />
      <goods />
    </template>

    <!-- 加在提示loading -->
    <van-loading type="spinner" color="#1989fa" vertical v-else>小可爱别急...</van-loading>
  </div>
</template>

<script>
import firstNav from '../components/FirstNav';
import sideNav from '../components/SideNav';
import goods from '../components/Goods';

import { mapState } from 'vuex';

export default {
  components: {
    firstNav,
    sideNav,
    goods
  },

  computed: {
    ...mapState({
      isShowContent: state => state.isShowContent
    })
  }
}
</script>

<style lang="less" scoped>
  .search-btn{
    width: 355px;
    height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #a1a1a1;
  }
</style>
