/*
 * @Author: CL
 * @Date: 2021-03-16 16:05:15
 * @LastEditTime: 2021-03-23 16:03:46
 * @Description: api文档
 */

import axios from 'axios';

const appkey = 'caolei_1615883515356';

const request = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey,
  },
})

//做一个响应拦截器
request.interceptors.response.use(res => res.data);

//获取一级菜单
const getTopNav = (params = {}) => request.get('/data/firstnav.json', { params });

//获取侧边栏的菜单
const getSideNav = (params = {}) => request.get('/getsidebar', { params });

//获取商品列表数据
const getGoodsList = (params = {}) => request.get('/getGoodsList', { params });

//搜索商品
const searchGoods = (params = {}) => request.get('/search', { params });

//模糊搜索
const searchLike = (params = {}) => request.get('/likeSearch', { params });

//通过商品id的集合来获取商品
const getGoodsByIds = (params = {}) => request.get('/getGoodsByIds', { params });

export default {
  getSideNav,
  getTopNav,
  getGoodsList,
  searchGoods,
  searchLike,
  getGoodsByIds
}