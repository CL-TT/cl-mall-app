<!--
 * @Author: CL
 * @Date: 2021-03-16 09:31:27
 * @LastEditTime: 2021-03-19 11:45:58
 * @Description: 一级导航菜单
-->

<template>
  <div class="firstnav-page" ref="firstNav">
    <div 
      class="nav-item" 
      :class="{ 'active': active == index }" v-for="(item, index) in menusList" 
      :key="item.title"
      @touchstart="touchStart"
      @touchend="touchEnd(index, item.title, $event)"
      @touchmove="touchMove"
    >
      <div class="img-wrap">
        <img :src="item.imgURL" alt="">
      </div>
      <div class="nav-text">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import util from '../util/util';

export default {
  data(){
    return {
      menusList: [],    //一级导航菜单的数据
      active: 0,        //活跃索引
      isMove: false
    }
  },

  methods: {
    ...mapActions(['getSideList']),
    ...mapMutations(['resetGoodsList']),
    
    /**
     * 手触碰上去
     */
    touchStart(){
      this.isMove = false;
    },

    /**
     * 手触碰结束
     */
    touchEnd(index, title, e){
      if(this.isMove) return;
      this.active = index;
      const { firstNav } = this.$refs;  //获取到父元素
      const firstNavWidth = firstNav.offsetWidth / 2;  //获取到父元素的宽度的一半
      const sonWidth = e.target.offsetWidth / 2;  //获取到子元素的宽度的一半
      const sonLeft = e.target.getBoundingClientRect().left;  //获取子元素距离左边的距离
      const dis = sonLeft + sonWidth - firstNavWidth;
      
      util.moveTo(firstNav.scrollLeft, dis, firstNav, 'scrollLeft');

      this.resetGoodsList();
      //获取侧边栏的菜单
      this.getSideList(title);
    },

    /**
     * 手指在移动
     */
    touchMove(){
      this.isMove = true
    },

    /**
     * 获取到一级菜单的数据
     */
    async getTopData(){
      try{
        const res = await axios.get('/data/firstnav.json')
        this.menusList = res.data;

        //要一开始就要加载第一个侧边的数据
        this.getSideList(this.menusList[0].title);
      }catch(err){
        console.log(err);
      }
    }
  },

  mounted() {
    //加载数据
    this.getTopData();
  },
}
</script>

<style lang="less" scoped>
.firstnav-page{
  width: 375px;
  height: 104px;
  display: flex;
  overflow: auto;

  &::-webkit-scrollbar{
    border-width: 0;
    background: none;
  }

  .nav-item{
    width: 50px;
    height: 70px;
    padding: 10px 5px;

    .img-wrap{
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 23px;
      border: 2px solid #fff;

      img{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }

    .nav-text{
      font-size: 12px;
      margin-top: 5px;
      text-align: center;
    }
  }

  .active{
    .img-wrap{
      border: 2px solid #d13193;
    }

    .nav-text{
      color: #fff;
      font-weight: bold;
      border-radius: 30px;
      background-color: #d13193;
    }
  }
}
</style>