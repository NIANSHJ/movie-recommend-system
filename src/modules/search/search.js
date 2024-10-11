import request from '@/request/user_request'

// 搜索电影
const search = (searchDto) => {
    return new Promise((resolve) => {
        request.post('/search/api/search', searchDto)
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

export default {
    search
}