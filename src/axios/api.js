import axios from 'axios'

export const requsetLogin = params => {
  return axios.post('/user/login', params)
}
