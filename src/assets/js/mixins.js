import api from '@/api/user'
const mixin = {
  props: {
    number: {
      default: ""
    },
    params: {
      default: function () {
        return {}
      }
    }
  }
};
const login_mixin = {
  methods: {
    checked_login() {
      var p = new Promise(function (resolve, reject) {
        api.checkLogin().then(res => {
          resolve(true);
        }).catch(err => {
          reject("error");
        });

      });
      return p;
    }
  }
}
export {
  mixin,
  login_mixin
};
