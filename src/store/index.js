import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../api/api';

//整个的一个过程，在组件里通过分发actions, 再通过的分发的actions来commit,mutations去改变state中的状态

export default new Vuex.Store({
  state: {
    sideList: [],   //侧边栏数组
    isShowContent: false,   //是否展示侧边栏

    goodsList: [],   //商品列表
    sortType: 'all',   //sortType是综合，销量和价格

    type: null,   //侧边栏类别类型，比如苹果等

    size: 7,

    countMap: {},  //商品数量数组
    goodsTotal: '',  //选择的商品的总数量
  },

  //这个mutation更像是注册了一个事件， 一个名称setSideList的事件，  需要去触发这个事件，才能让状态改变
  mutations: {
    setSideList(state, list){
      state.sideList = list
    },

    setIsShowContent(state, bool){
      state.isShowContent = bool;
    },

    setGoodsList(state, list){
      state.goodsList = [...state.goodsList, ...list];
    },

    setType(state, type){
      state.type = type;
    },

    resetGoodsList(state){
      state.goodsList = [];
    },

    setSortType(state, sortType){
      state.sortType = sortType;
    },

    setCountMap(state, map){
      state.countMap = map;
    },

    setGoodsTotal(state, num){
      state.goodsTotal = num;
    },

    setStroageMap(state, { id, value }) {
      if (state.countMap[id] || state.countMap[id] == 0) {
        if ((state.countMap[id] === 0 && value === -1) || value == '-') {
          Vue.set(state.countMap, id, 0);
        }else{
          Vue.set(state.countMap, id, state.countMap[id] + value);
        }
      }else {
        Vue.set(state.countMap, id, 1);
      }

      //计算总的数量值
      const total = Object.values(state.countMap).reduce((pre, item) => { return pre + item }, 0);
      if(total > 99){
        state.goodsTotal = '99+';
      }else if(total == 0){
        state.goodsTotal = '';
      }else{
        state.goodsTotal = total;
      }

      localStorage.setItem('goods', JSON.stringify(state.countMap));
      localStorage.setItem('goodsTotal', JSON.stringify(state.goodsTotal));
    }
  },

  //通过解构的方式来获取commit，   context.commit
  actions: {
    /**
     * 请求侧边栏数据
     */
    async getSideList({ commit }, type){
      try{
        commit('setIsShowContent', false);
        const res = await api.getSideNav({ type });
        commit('setSideList', res);
        commit('setIsShowContent', true);
      }catch(err){
        console.log(err);
      }
    },

    /**
     * 请求商品列表
     */
    async getGoodsList({ commit, state }, params){
      let type = params.type || state.type;
      const { sortType, size } = state;
      const { page } = params;
      let temp = {
        type,
        page,
        size,
        sortType
      }
      try{
        const { list, total } = await api.getGoodsList(temp);
        commit('setGoodsList', list);

        if(state.goodsList.length >= total){
          //如果数组里面的数据已经大于总的数据，那么就返回false
          return false;
        }else{
          return true;
        }
      }catch(err){
        console.log(err);
      }
    },

    getSortType({ commit }, param){
      commit('setSortType', param);
    }
  },

  modules: {
  }
})
