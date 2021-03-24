<!--
 * @Author: CL
 * @Date: 2021-03-17 09:32:14
 * @LastEditTime: 2021-03-22 15:46:13
 * @Description: 商品组件
-->

<template>
  <div class="goodscard-page van-hairline--bottom">
    <div class="card-img">
      <img :src="goodsInfo.images[0]" alt="">
    </div>

    <div class="card-content">
      <div class="title overflow-hidden">{{ goodsInfo.title }}</div>
      <div class="desc overflow-hidden">{{ goodsInfo.desc }}</div>
      <div class="tags">
        <div v-for="item in  goodsInfo.tags" :key="item">{{ item }}</div>
      </div>
      <div class="prices">{{  goodsInfo.price }}</div>

      <div class="counter">
        <div @touchend="counter(goodsInfo.id, -1)">
          <van-icon name="minus" color="#fff"/>
        </div>
        <div class="num">{{ num }}</div>
        <div @touchend="counter(goodsInfo.id, 1)">
          <van-icon name="plus" color="#fff"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    goodsInfo: {
      type: Object
    },

    num: {
      default: 0
    }
  },

  methods: {
    ...mapMutations(['setStroageMap']),

    /**
     * 加减按钮，改变购买的商品数量
    */
    counter(id, value){
      if(this.$store.state.countMap[id] === 0 && value == -1) return;
      this.setStroageMap({ id, value });
    }
  },

  data(){
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.goodscard-page{
  width: 100%;
  display: flex;
  height: 100px;

  .card-img{
    width: 90px;
    height: 90px;
    margin-right: 20px;

    img{
      width: 90px;
      height: 90px; 
    }
  }

  .card-content{
      flex: 1;
      position: relative;

      > div{
        width: 170px;

        &.title{
          font-size: 13px;
          color: #1a1a1a;
          margin-top: 5px;
        }

        &.desc{
          color: #aaa;
          font-size: 11px;
          margin-top: 5px;
        }

        &.tags{
          display: flex;
          margin-top: 4px;

          >div{
            font-size: 10px;
            padding: 2px;
            color: #aaa;
            border-radius: 3px;
            margin-right: 5px;
            border: 1px solid #aaa;
          }
        }

        &.prices{
          color: #ff1a90;
          font-size: 14px;
          font-weight: 600;
          margin-top: 4px;
        }

        &.counter{
          position: absolute;
          bottom: 12px;
          right: 15px;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          > div:not(.num){
            width: 18px;
            height: 18px;
            background: #ff1a90;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .num{
            padding: 0 6px;
          }
        }
      }

      .overflow-hidden{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
}
</style>