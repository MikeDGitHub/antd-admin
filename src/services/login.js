import { request, config } from 'utils'

const { api } = config
const { userLogin } = api

export function login (data) {
  data.grant_type='password';
  data.client_id='2';
  data.client_secret='secret'
  return request({
    url: userLogin,
    method: 'post',
    data
  })
}
