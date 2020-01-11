import fetch from '../utils/fetch.js'

export default {
  login (data) {
    return fetch({
      url: '/login',
      method: 'post',
      data
    });
  }
}
