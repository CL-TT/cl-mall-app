<!--
 * @Author: CL
 * @Date: 2021-03-16 16:01:36
 * @LastEditTime: 2021-03-19 10:25:40
 * @Description: 侧边栏组件
-->

<template>
  <div class="sidenav-page" ref="sideNav">
    <div 
      :class="{ 'active': index == active }" 
      v-for="(item, index) in sideList" 
      :key="item"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd(index, item, $event)"
    >{{ index == 0? '全部' : item }}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import util from '../util/util';

export default {
  data(){
    return {
      active: 0,

      isMove: false
    }
  },

  methods: {
    ...mapActions(['getGoodsList']),
    ...mapMutations(['setType', 'resetGoodsList']),

    touchStart(){
      this.isMove = false;
    },

    touchMove(){
      this.isMove = true;
    },

    touchEnd(index, type, e){
      if(this.isMove) return;

      this.active = index;

      const { sideNav } = this.$refs;
      const sideHeight = sideNav.offsetHeight / 2;   //侧边栏高度的一半
      const sideTop = sideNav.getBoundingClientRect().top; //侧边栏距离上边的距离
      const sonHeight = e.target.offsetHeight / 2;   //子元素高度的一半
      const sonTop = e.target.getBoundingClientRect().top;  //获取子元素距离上边的距离
      const dis = sonTop + sonHeight - sideHeight - sideTop;
      
      util.moveTo(sideNav.scrollTop, dis, sideNav, 'scrollTop');

      this.resetGoodsList();

      //请求商品的数据
      this.getGoodsList({ type, page: 1 });

      //并改变仓库中对应的type
      this.setType(type);
    },
  },

  mounted() {
    this.setType(this.sideList[0]);
    
    //加载商品数据, 一开始就加载数据，是全部的那一类
    this.getGoodsList({ type: this.sideList[0], page: 1 })
  },

  computed: {
    ...mapState({
      sideList: state => state.sideList
    })  
  }
}
</script>

<style lang="less" scoped>
.sidenav-page{
  position: fixed;
  width: 79px;
  top: 135px;
  bottom: 50px;
  left: 0;
  overflow: auto;

  &::-webkit-scrollbar{
    border: none;
    background: none;
  }

  div{
    width: 79px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    position: relative;
  }

  .active{
    font-weight: bold;
    color: #ff1a90;
  }

  .active::before{
    width: 6px;
    height: 18px;
    background: #ff1a90;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    content: '';
  }
}

</style>
