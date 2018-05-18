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
    url: api.genreList,
    method: 'post',
    data: data,
  })
}

export function queryInfo (params) {
  return request({
    url: api.genreInfo,
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
    url: api.genreAdd,
    method: 'post',
    data:{GenreName:params.genreName,status:params.status?1:0},
  })
}
