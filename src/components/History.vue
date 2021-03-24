<!--
 * @Author: CL
 * @Date: 2021-03-23 14:03:40
 * @LastEditTime: 2021-03-23 15:13:46
 * @Description: 展示搜索的历史记录组件
-->

<template>
  <div class="history-page">
    <h4>历史记录：</h4>
    <div class="his-item"
      v-for="item in searchList"
      :key="item"
      @click="search(item)">{{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },

  methods: {
    search(val){
      this.$emit('search', val);
    }
  },

  props: {
    searchList: {
      type: Array
    }
  }
}
</script>

<style lang="less" scoped>
.his-item {
  padding: 15px;
  background: #eee;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>
