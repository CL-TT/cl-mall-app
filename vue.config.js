/*
 * @Author: CL
 * @Date: 2021-03-15 17:50:58
 * @LastEditTime: 2021-03-15 17:52:51
 * @Description: 
 */
const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5
          })
        ]
      }
    }
  }
}