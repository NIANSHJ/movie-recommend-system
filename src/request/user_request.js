import axios from 'axios'
import { ElMessage } from 'element-plus'
import userInfoStore from '@/stores/user/userInfo'
import router from '@/router'

//公共前缀
const baseURL = '/app'
const instance = axios.create({ baseURL })

//添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        const token = userInfoStore().data.token
        if (token) {
            config.headers.Authorization = token
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
);

//添加响应拦截器
instance.interceptors.response.use(
    (result) => {
        if (result.data.code === 200) {
            return result.data
        } else {
            ElMessage.error(result.data.message)
        }
        return Promise.reject(result)
    },
    (error) => {
        if (error.status === 401) {
            ElMessage.error('请先登录')
            router.push('/login')
        } else {
            ElMessage.error('服务异常')
        }
        return Promise.reject(error)
    }
);

export default instance