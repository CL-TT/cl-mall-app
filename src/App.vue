<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default{
  created() {
    //从缓存中取出，每一个商品对应的数量
    const map = JSON.parse(localStorage.getItem('goods')) || {};

    const total = JSON.parse(localStorage.getItem('goodsTotal')) || '';

    this.$store.commit('setCountMap', map);
    this.$store.commit('setGoodsTotal', total);
  },
}
</script>


<style lang="less">
//引入基本样式重置表
@import './assets/css/reset.css';

#app{
  width: 375px;
  height: 100px;
  // background: red;
}
</style>
