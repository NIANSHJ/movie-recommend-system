<template>
    <el-card class='search' shadow='never'>
        <ul>
            <li><el-link :underline="false" style="color: #333;">分类</el-link></li>
            <li v-for="(genre, index) in genres" :key="index">
                <el-link :underline="false" :disabled="genreStatus === index" @click="genreChange(index)">{{
                    genre }}</el-link>
            </li>
        </ul>
        <ul>
            <li><el-link :underline="false" style="color: #333;">排序</el-link></li>
            <li>
                <el-link :underline="false" @click="sortByIssue">时间</el-link>
                <el-icon v-if="movieDto.issue === -1">
                    <Bottom />
                </el-icon>
                <el-icon v-if="movieDto.issue === 1">
                    <Top />
                </el-icon>
            </li>
            <li>
                <el-link :underline="false" @click="sortByHot">人气</el-link>
                <el-icon v-if="movieDto.hot === -1">
                    <Bottom />
                </el-icon>
                <el-icon v-if="movieDto.hot === 1">
                    <Top />
                </el-icon>
            </li>
            <li>
                <el-link :underline="false" @click="sortByAvg">评分</el-link>
                <el-icon v-if="movieDto.avg === -1">
                    <Bottom />
                </el-icon>
                <el-icon v-if="movieDto.avg === 1">
                    <Top />
                </el-icon>
            </li>
        </ul>
    </el-card>
    <div>
        <el-row :gutter="25">
            <el-col v-for="movie in moviesData" :key="movie.mid" :span="4">
                <router-link class="router-link" :to="{ path: '/movie', query: { mid: movie.mid } }">
                    <div class="movie-display">
                        <div class="movie-poster">
                            <img :src="movie.poster">
                        </div>
                        <div class="movie-detail">
                            <el-tooltip placement="bottom">
                                <template #content>
                                    {{ movie.name }}
                                </template>
                                <div class="movie-name">{{ movie.name }}</div>
                            </el-tooltip>
                        </div>
                    </div>
                </router-link>
            </el-col>
        </el-row>
        <el-pagination v-model:current-page="movieDto.page" layout="prev, pager, next" :page-size="30"
            :page-count="pageCount" @current-change="handleCurrentChange" style="justify-content: flex-end" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import movieService from '@/modules/movie/movie'
import { Top, Bottom } from '@element-plus/icons-vue'

// 电影类型
const genres = ['all', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
    'Family', 'Fantasy', 'Foreign', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science',
    'Tv', 'Thriller', 'War', 'Western']

// 初始化链接为可用状态
const genreStatus = ref(0)

// 被选中的种类链接设置为禁用状态
const genreChange = (index) => {
    genreStatus.value = index
    movieDto.value.genre = genres[index]
    movieDto.value.page = 1
    getMovies()
}
// 根据时间排序
const sortByIssue = () => {
    movieDto.value.issue === -1 ? movieDto.value.issue = 1 : movieDto.value.issue = -1
    movieDto.value.avg = movieDto.value.hot = 0
    getMovies()
}
// 根据人气排序
const sortByHot = () => {
    movieDto.value.hot === -1 ? movieDto.value.hot = 1 : movieDto.value.hot = -1
    movieDto.value.avg = movieDto.value.issue = 0
    getMovies()
}
// 根据评分排序
const sortByAvg = () => {
    movieDto.value.avg === -1 ? movieDto.value.avg = 1 : movieDto.value.avg = -1
    movieDto.value.hot = movieDto.value.issue = 0
    getMovies()
}

// 参数列表（issue发行时间，hot人气，avg平均评分，genre类型，page页数）
const movieDto = ref({
    issue: 0, hot: 0, avg: 0, genre: 'all', page: 1
})

// 电影列表数据
const moviesData = ref([])

// 总页数
const pageCount = ref(0)

// 获取电影列表
const getMovies = async () => {
    const { data, total } = await movieService.movies(movieDto.value)
    moviesData.value = data
    pageCount.value = Math.ceil(total / 30)
    // 获取电影海报图
    moviesData.value.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
    })
}

// 页码发生变化时触发
const handleCurrentChange = () => {
    getMovies()
}

onMounted(() => {
    getMovies()
})
</script>

<style lang="scss" scoped>
.movie-display {
    height: 40vh;
    margin-bottom: 3vh;

    .movie-poster {
        width: 100%;
        height: 90%;
    }

    .movie-detail {
        white-space: nowrap;

        .movie-name {
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333;
            font-weight: lighter;
        }
    }
}

.el-card {
    margin-bottom: 3vh;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin: 5px;
    padding: 10px;
    font-size: 14px;
}

.el-link {
    font-size: 14px;
}

.router-link {
    text-decoration: none;
}

img {
    width: 100%;
    height: 100%;
}
</style>
