<!--
 * @Author: CL
 * @Date: 2021-03-22 17:08:45
 * @LastEditTime: 2021-03-24 09:17:37
 * @Description: 搜索页面
-->

<template>
  <div class="search-page">
    <div class="search-header">
      <!-- 返回箭头 -->
      <van-icon name="arrow-left" class="arr-left" @click="goBackPage"/>
      <!-- 搜索框 -->
      <van-search
        v-model="searchVal"
        show-action
        :placeholder="placeHolder"
        @search="onSearch"
        @input="onInput"
        class="search-main"
      >
        <template #action>
          <div class="shop-car" v-if="goodsList.length > 0">
            <van-icon name="shopping-cart-o" :badge="goodsTotal" @click="$router.push('/home/shopping')"/>
          </div>
          <div v-else @click="onSearch()">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="search-content">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          @click="onSearch(item)"
        >
          <template>
            <span class="custom-title" v-html="formatHtml(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 商品列表内容 -->
    <div class="goods-content" v-if="goodsList.length > 0">
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
    <div class="history" v-if="likeList.length <= 0 && goodsList.length <= 0">
       <history :searchList="historyList" @search="onSearch"></history>
    </div>
    <van-empty class="van-empty" v-if="goodsList.length == 0 && likeList.length == 0" image="search" description="没有找到相关宝贝哦" />
    <van-loading v-if="isLoading" class="van-loading" type="spinner" color="#1989fa" vertical>快马加鞭中...</van-loading>
  </div>
</template>

<script>
import util from '../util/util';
import goodsCard from '../components/GoodsCard';
import history from '../components/History';
import { mapState } from 'vuex';

export default {
  data(){
    return {
      searchVal: '',   //搜索词
      likeList: [],    //模糊搜索列表
      placeHolder: '酒',  //搜索提示语

      isLoading: false,

      loading: false,
      finished: false,

      page: 1, 
      size: 7,

      goodsList: [],   //商品数组

      historyList: [],  //历史记录
    }
  },

  created() {
    //一开始就从缓存中拿到搜索的历史记录
    const temp = JSON.parse(localStorage.getItem('historySearch'));
    if(temp){
      this.historyList = temp;
    }else{
      this.historyList = [];
    }
  },

  components: {
    goodsCard,
    history
  },

  computed: {
    ...mapState({
      countMap: state => state.countMap,
      goodsTotal: state => state.goodsTotal
    })
  },

  methods: {
    /**
     * 返回上一页
     */
    goBackPage(){
      this.$router.goBack();
    },

    /**
     * 搜索事件
     */
    onSearch(val){
      //在搜索的时候，把搜索记录加以保存
      if(this.searchVal === ''){
        this.searchVal = this.placeHolder;
      }
      if(val){
        //这种情况是在列表上点击的
        this.searchVal = val;
      }
      this.likeList = [];
      this.goodsList = [];  //商品数组和模糊搜索数组全部清空

      //加入的时候要判断一下数组中存不存在同样的值
      const isEqual = this.historyList.find(item => {
        return item == this.searchVal;
      })
      if(!isEqual){
        this.historyList.unshift(this.searchVal);
      }
      if(this.historyList.length > 10){
        //如果总的数量超过十个，那么就把数组中的最后一个删掉
        this.historyList.pop();
      }
      localStorage.setItem('historySearch', JSON.stringify(this.historyList));
      //请求数据
      this.onRefresh();
    },

    /**
     * 输入框发生改变的时候触发
     * 1. 要做防抖处理
     */
    onInput: util.Debounce(
      async function(){
        try{
          const { searchVal } = this;
          if(searchVal === ''){
            this.likeList = [];
            this.goodsList = [];
            return;
          }
          const res = await this.$api.searchLike({ likeValue: searchVal });
          this.likeList = res.result;
        }catch(err){
          console.log(err);
        }
      },
      500
    ),

    /**
     * 下拉刷新
     */
    async onRefresh(){
      this.page = 1;
      this.isLoading = true;
      const { searchVal, size } = this;
      const { list } = await this.$api.searchGoods({ type: searchVal, page: this.page, size });
      this.goodsList = list;
      this.isLoading = false;
    },

    /**
     * 加载更多
     */
    async loadMore(){
      this.page += 1;
      this.loading = true;
      const { list, total } = await this.$api.searchGoods({ type: this.searchVal, page: this.page, size: this.size });
      if(this.goodsList.length < total){
        //还可以加载
        this.goodsList = [...this.goodsList, ...list];
        this.finished = true; 
      }else{
        this.loading = true;
      }
    },

    /**
     * 格式化展示文字，让被搜索的文字高亮展示
     */
    formatHtml(item){
      const reg = new RegExp(this.searchVal, 'g');
      //把匹配出来的值用红色的值代替
      return item.replace(reg, this.searchVal.fontcolor('red'));
    }
  }
}
</script>

<style lang="less" scoped>
.search-page{
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;

  .search-header{
    width: 345px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    background: #fff;
    top: 0;
    left: 15px;
    z-index: 100;

    .arr-left{
      font-size: 22px;
    }

    .search-main{
      flex: 1;

      .shop-car{
        font-size: 25px;
        display: flex;
        align-items: center;
      }
    }
  }

  .search-content{
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 30px;
  }

  .goods-content{
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }

  .van-empty{
    height: 100vh;
  }

  .history {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }

  .van-loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>