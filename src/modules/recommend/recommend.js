import request from '@/request/user_request'

// 推荐列表
const recommend = (movieDto) => {
    return new Promise((resolve) => {
        request.get('/recommend/api/recommend')
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

export default {
    recommend
}