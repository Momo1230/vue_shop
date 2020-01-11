import axios from 'axios';

const service = axios.create({
  baseURL:'http://127.0.0.1:8888/api/private/v1/',  //api的base url
  timeout:1500  //请求超时时间
});

//request拦截器
service.interceptors.request.use(config=>{
  config.params = config.params || {};
  return config;
},error => {
  Promise.reject(error)
})

//response拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  return res
},error => {
  return Promise.reject(error);
})

export default service;
