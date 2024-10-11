import request from '@/request/user_request'

// 电影列表
const movies = (movieDto) => {
    return new Promise((resolve) => {
        request.get('/movie/api/movies', { params: movieDto })
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

// 电影详情
const movieDatail = (mid) => {
    return new Promise((resolve) => {
        request.get('/movie/api/movie', { params: { mid: mid } })
            .then((response) => { resolve(response) })
            .catch((error) => { console.log(error) })
    })
}

export default {
    movies, movieDatail
}