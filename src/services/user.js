import { request, config } from 'utils'

const { api } = config
const { user } = api

export function query (params) {
  return request({
    url: api.userInfo,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  console.log('create')
  return request({
    url: user,
    method: 'post',
    data: {Mobile:params.phone,LoginName:params.loginName,UserName:params.userName,UserEmail:params.email,Password:params.password,ClientId:1,status:params.status},
  })
}

export function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
