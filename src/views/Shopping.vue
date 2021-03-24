<!--
 * @Author: CL
 * @Date: 2021-03-15 21:57:16
 * @LastEditTime: 2021-03-24 17:22:29
 * @Description: 购物车页面
-->

<template>
  <div class="shopping-page">
    <!-- 头部区域 -->
    <div class="top-nav">
      <van-nav-bar title="购物车" right-text="删除" @click-right="del"/>
    </div>

    <!-- 购物车中的物品列表 -->
    <div class="card-list">
      <van-checkbox-group v-model="result" v-for="item in list" :key="item.id" ref="checkboxGroup">
        <div class="card-box">
          <van-checkbox class="check" :name="item.id"></van-checkbox>
          <goods-card :goodsInfo="item" :num="countMap[item.id]"></goods-card>
        </div>
      </van-checkbox-group>
    </div>

    <!-- 结算区域 -->
    <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import goodsCard from '../components/GoodsCard';
import { mapState, mapMutations } from 'vuex';
import { Toast, Dialog } from 'vant';

export default {
  data(){
    return {
      result: [],  //会记录哪些多选按钮被选中

      idArr: [],   //id集合

      list: [],    //商品数组

      checked: false,
    }
  },

  created() {
    for(let prop in this.countMap){
      if(this.countMap[prop] == 0){
        continue;
      }else{
        this.idArr.push(prop);
      }
    }
    
    //请求数据
    this.getValByIds(this.idArr.join());
  },

  methods: {
    ...mapMutations(['setStroageMap']),

    /**
     * 删除选中的商品
     */
    del(){
      if(this.result.length === 0){
        Toast('您还没有选中任何商品哦！');
        return;
      }

      Dialog.confirm({
        title: '标题',
        message: '您确定要删除吗？'
      })
      .then(() => {
        const arr = this.list.map(item => { return item.id });
        //确认删除，把选中的商品从list数组拿掉
        for(let i = 0; i < this.result.length; i++){
          const index = arr.indexOf(this.result[i]);
          this.list.splice(index, 1);
          this.setStroageMap({id: this.result[i], value: '-'});
        }

        this.result = [];
      })
      .catch(() => {
        return;
      });
    },

    /**
     * 根据id集合去获得商品数据
     */
    async getValByIds(arr){
      try{
        if(arr.length <= 0) return;
        const { list, length } = await this.$api.getGoodsByIds({ value: arr });
        this.list = list;
        console.log(length);
      }catch(err){
        console.log(err);
      }
    },

    /**
     * 结算事件
     */
    onSubmit(){

    },

    /**
     * 多选框全选/取消全选事件
     */
    checkAll(){
      if(this.checked){
        this.$refs.checkboxGroup[0].toggleAll(true);
      }else{
        this.$refs.checkboxGroup[0].toggleAll(false);
      }
    },

    /**
     * 判断有没有全选上
     */
    // isCheckAll(){
    //   if(this.result.length == this.list.length && this.result.length != 0){
    //     this.checked = true
    //   }else if(this.result.length != this.list.length){
    //     this.checked = false;
    //   }
    // }
  },

  components: {
    goodsCard
  },

  watch: {
    /**
     * 用监听result的方式，来解决点击上面的多选框，取消全选
     */
    result(){
      if(this.result.length == this.list.length && this.result.length != 0){
        this.checked = true;
      }else if(this.result.length != this.list.length || this.result.length == 0){
        this.checked = false;
      }
    }
  },

  computed: {
    ...mapState({
      countMap: state => state.countMap
    }),

    /**
     * 计算总的价钱
     */
    allMoney(){
      //看这个商品id是否存在在result这个数组中, 这是筛选被check选中的商品
      const arr = this.list.filter(item => {
        return this.result.includes(item.id);
      })

      const allMoney = arr.reduce((pre, item) => {
        return pre + (item.price * this.countMap[item.id]) 
      }, 0)

      return allMoney * 100;
    },

    /**
     * 计算选中商品的数量
     */
    totalNum(){
      const arr = this.list.filter(item => {
        return this.result.includes(item.id);
      })

      const totalNum = arr.reduce((pre, item) => {
        return pre + this.countMap[item.id];
      }, 0)

      return totalNum;
    }
  }
}
</script>

<style lang="less" scoped>
.shopping-page{
  background: #eee;
  min-height: 100vh;

  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  .card-list {
    width: 100%;
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    
    .card-box {
      display: flex;
      justify-content: center;

      .check {
        margin-right: 10px;
        flex-shrink: 0;
      }
    }
  }

  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
