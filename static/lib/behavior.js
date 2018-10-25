import api from '../../src/api/behavior'
// var second = 0;
// window.setInterval(function () {
//   second++;
// }, 1000);

export default {
    behavior_data(keyword, type) {
      console.log(config.user_behavior);
      if (config.user_behavior) {
        api.behavior({
          // 'time': second,
          'keyword': keyword,
          // 'timeIn': Date.parse(new Date()),
          // 'timeOut': Date.parse(new Date()) + (second * 1000),
          'type': type
        }).then((res) => {

        }).catch((error) => {

        })
      }
    },

}
