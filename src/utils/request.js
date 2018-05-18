/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { YQL, CORS, api, getQueryString } from './config'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    //message.error(e.message)
  }



  switch (method.toLowerCase()) {
    case 'get':
      // instance = axios.create();
      // //let oauth = JSON.parse(localStorage.getItem('oauth'));
      // //instance.defaults.headers.common['Authorization'] = 'Bearer ' + oauth.access_token;
      // instance.get(url).then(function(response){
      //   //localStorage.setItem('userInfo',JSON.stringify(response.data));
      //   console.log(response);
      //   return response;
      // }).catch(function(error){
      //   if (error.response.status === 401) {
      //     unAuthorization(oauth.refresh_token);
      //    }else{
      //      alert('error');
      //    }
      //   console.log(error);
      // })
  
      
      return axios.get(url, {params: cloneData}).then(function (response) {
        console.log(response.data);
        return response;

      }).catch(function (error) {
        console.log(error);
      })
    case 'delete':
    // return axios.delete(url, {
    //   data: cloneData,
    // })
    case 'post':
      var instance = axios.create();
      console.log('post')
      let data = {}
      let oauth = JSON.parse(localStorage.getItem('oauth'));
      if (url.search('token') < 1) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + oauth.access_token;
        instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
        data = cloneData;
      }
      else {
        instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        data = qs.stringify(cloneData);
      }
      console.log(data);
      return instance.post(url, data)
        .then(function (response) {
          //if (response.data.code == 626) {
          if (url.search('token') > 1) {
            localStorage.setItem('oauth', JSON.stringify(response.data));
          }
          console.info(response.data);
          // if (response.data.error !== undefined) {
          //   if (response.data.error !== true) {
          //     message.warn(response.data.error);
          //   }
          // }

          return response;
        }).catch(function (error) {
          if (error.response.status === 401) {
            unAuthorization(oauth.refresh_token);
          }
          data = JSON.parse(JSON.stringify(error.response.data));
          message.error(data.error_description)
          //alert(data.error_description);
        });
    //return axios.post(url, cloneData)
    case 'put':
    //return axios.put(url, cloneData)
    case 'patch':
    //return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}
function unAuthorization(refresh_token) {
  let data = { grant_type: 'refresh_token', client_id: 2, client_secret: 'secret', refresh_token: refresh_token };
  var instance = axios.create();
  instance.post(api.userLogin, qs.stringify(data))
    .then(function (response) {
      localStorage.setItem('oauth', JSON.stringify(response.data));
      return response;
    })
    .catch(function (error) {
      console.log(error)
    })
}
export default function request(options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSONP'
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }
    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    })
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    console.log(1234)
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }

    /* eslint-disable */
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
