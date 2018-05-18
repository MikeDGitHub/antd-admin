import { request, config } from 'utils'
import { getQueryString } from 'config'
const { api } = config


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
    url: api.typeList,
    method: 'post',
    data: data,
  })
}

export function queryInfo (params) {
  return request({
    url: api.typeInfo,
    method: 'get',
    data: params,
  })
}
export function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
export function create (params) {
  console.log('create')
  return request({
    url: api.typeAdd,
    method: 'post',
    data:{TypeName:params.typeName,status:params.status?1:0},
  })
}
