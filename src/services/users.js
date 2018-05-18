import { request, config } from 'utils'
import { getQueryString } from 'config'
const { api } = config
const { users } = api

export function query (params) {
  let data={};
  data.PageIndex=parseInt(params.page)-1;
  data.PageSize=params.PageSize;
  let name=getQueryString('name');
  if(name!==null)
  {
    data.Name=name;
  }
  return request({
    url: users,
    method: 'post',
    data: data,
  })
}

export function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
