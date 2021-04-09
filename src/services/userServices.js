import { http } from './httpServices'
import { setToken } from './authServices'

export function update(user) {
  return http()
    .put(`/user`, user)
    .then((res) => {
      if (res) {
        setToken(res.data.token)
      }
    })
    .catch(function (error) {
      if (error.response) {
        return error.response
      }
    })
}
