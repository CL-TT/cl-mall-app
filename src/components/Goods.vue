<!--
 * @Author: CL
 * @Date: 2021-03-16 21:32:22
 * @LastEditTime: 2021-03-22 15:45:25
 * @Description: 商品列表组件
-->

<template>
  <div class="goods-page">
    <div class="goods-header van-hairline--top-bottom">
      <div 
        v-for="item in headerList" 
        :key="item.name" 
        :class="{ 'active': type == item.type }"
        @click="changeType(item.type)"
      >{{ item.name }}</div>
      <div 
        class="price" 
        @click="changeType('price')"
        :class="{'price-up': type == 'price-up', 'price-down': type == 'price-down'}"
      >价格</div>
    </div>
    <div class="goods-content">
      <!-- vant自带的下拉刷新组件 -->
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <!-- vant自带的列表组件 -->
        <van-list
          finished-text="没有更多了"
          v-model="loading"
          :finished="finished"
          @load="loadMore"
          :immediate-check="false"
        > 
           <!-- 每一个商品 -->
           <goods-card v-for="(item,index) in goodsList" :key="index" :goodsInfo="item" :num="countMap[item.id]"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import goodsCard from './GoodsCard';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data(){
    return {
      headerList: [
        {name: '综合', type: 'all'},
        {name: '销量', type: 'sale'},
      ],

      type: 'all',   //按钮的类型

      isLoading: false,

      page: 1,
      size: 7,

      loading: false,
      finished: false
    }
  },

  methods: {
    ...mapActions(['getSortType', 'getGoodsList']),
    ...mapMutations(['resetGoodsList']),

    /**
     * 改变类型，是根据综合，还是销量，还是按照价格高低来排
     */
    changeType(type){
      if(type == 'price'){
        if(this.type == 'price-up'){
          this.type = 'price-down';
        }else{
          this.type = 'price-up';
        }
      }else{
        this.type = type;
      }

      this.getSortType(this.type);
      this.onRefresh();
    },

    /**
     * 下拉刷新，每一次下拉刷新的page都是按1开始的
     */
    onRefresh(){
      this.isLoading = true;

      //重置goodsList数组
      this.resetGoodsList();

      //重新请求数据
      this.getGoodsList({ page: 1 });
      this.isLoading = false;
    },

    /**
     * 下拉加载更多
     */
    async loadMore(){
      this.page += 1;
      this.loading = true;
      const flag = await this.getGoodsList({page: this.page});

      if(!flag){
        this.finished = true;
      }else{
        this.loading = false;
      }
    }
  },

  computed: {
    ...mapState({
      goodsList: state => state.goodsList,
      countMap: state => state.countMap
    })
  },

  components: {
    goodsCard
  }
}
</script>

<style lang="less" scoped>
.goods-header{
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > div{
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
    position: relative;
  }

  .active, .price-up, .price-down{
    color: #ff1a90;
    font-weight: bold;
  }

  .price::after{
    content: '';
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    bottom: 4px;
    right: 0;
  }

  .price::before{
    content: '';
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    top: 4px;
    right: 0;
  }

  .price-up::before{
    border-bottom-color: #ff1a90;
  }

  .price-down::after{
    border-top-color: #ff1a90;
  }
}

.goods-content{
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;

  .van-pull-refresh {
    overflow: unset !important;
  }
}
</style>