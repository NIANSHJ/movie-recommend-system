import request from '@/request/user_request'

// 注册
const register = (registerDto) => {
    return new Promise((resolve) => {
        request.post('/user/api/register', registerDto)
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

// 登录
const login = (loginDto) => {
    return new Promise((resolve) => {
        request.post('/user/api/login', loginDto)
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

export default {
    register, login
}