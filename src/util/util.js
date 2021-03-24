/*
 * @Author: CL
 * @Date: 2021-03-16 19:51:24
 * @LastEditTime: 2021-03-22 17:48:32
 * @Description: 工具方法
 */

/**
 * 运动方法
 * @param {Number} start 起始点
 * @param {Number} end 终点
 * @param {dom} element 要移动的元素
 */
const moveTo = (start, end, element, prop) => {
  let dis = 0;
  let speed = 5;   //运行的速度

  if(end < 0){
    speed *= -1;
  }

  let timer = setInterval(() => {
    dis += speed;
    element[prop] = start + dis;

    if(Math.abs(dis) > Math.abs(end)){
      //运动的距离已经大于要移动的距离
      element[prop] = start + end;
      clearInterval(timer);
    }
  }, 2)
};

/**
 * 防抖函数
 * @param {function} fn 传进来的逻辑函数 
 * @param {number} delay 延迟时间 
 */
const Debounce = function(fn, delay){
  let timer = 0;
  return function(...args){
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, [...args]);
    }, delay);
  }
}

export default {
  moveTo,
  Debounce
}