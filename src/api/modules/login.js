import axios from '../axiosConfig'
export const loginApi = (params)=> {
    return axios.post('/login1', params)
}