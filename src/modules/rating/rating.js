import request from '@/request/user_request'

// 给电影评分
const rate = (ratingDto) => {
    return new Promise((resolve) => {
        request.post('/rating/api/rate', ratingDto)
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

export default {
    rate
}