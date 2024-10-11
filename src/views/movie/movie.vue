<template>
    <div class='movie'>
        <div class='poster'>
            <img :src='movieDetail.post' class='image'>
        </div>
        <div class='detail'>
            <div class='name'>
                <h2>{{ movieDetail.name }}</h2>
            </div>
            <div class='description'>
                <span>描述:{{ movieDetail.description ? movieDetail.description : '无' }}</span>
            </div>
            <div class='description'>
                <span class="content">时长:{{ movieDetail.duration }}</span>
            </div>
            <div class='description'>
                <span>发行时间:{{ movieDetail.issue }}</span>
            </div>
            <div class='description'>
                <span>拍摄时间:{{ movieDetail.shoot }}</span>
            </div>
            <div class='description'>
                <span>语言:{{ movieDetail.language }}</span>
            </div>
            <div class='description'>
                <span>类型:{{ movieDetail.genres }}</span>
            </div>
            <div class='description'>
                <span>演员表:{{ movieDetail.actors }}</span>
            </div>
            <div class='description'>
                <span>导演:{{ movieDetail.directors }}</span>
            </div>
            <div class='description'>
                <el-rate v-model="movieDetail.avg" disabled show-score text-color="#ff9900" score-template="{value}" />
                <div>共有{{ movieDetail.count }}人评分</div>
            </div>
            <div class='rate'>
                <el-rate v-model="ratingDto.score" allow-half />
                <el-button type='primary' @click='rate'>评分</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import userInfoStore from '@/stores/user/userInfo'
import movieService from '@/modules/movie/movie'
import ratingService from '@/modules/rating/rating'
import { ElMessage } from 'element-plus'

// 路由
const route = useRoute()

// 电影ID 
const mid = route.query.mid

// 电影列表数据
const movieDetail = ref({
    name: '', description: '', duration: '', issue: '', shoot: '', language: '', genres: '',
    actors: '', directors: '', count: 0, avg: 0, tag: ''
})

// 获取电影列表
const getMovieDatail = async () => {
    const { data } = await movieService.movieDatail(mid)
    movieDetail.value = { ...data }
    movieDetail.value.avg === null ? movieDetail.value.avg = 0 : movieDetail.value.avg
    movieDetail.value.count === null ? movieDetail.value.count = 0 : movieDetail.value.count
    movieDetail.value.avg = Number(movieDetail.value.avg.toFixed(1))
    movieDetail.value.post = `/images/${mid}/poster.jpg`
}

// 评分数据
const ratingDto = ref({
    mid: mid, uid: userInfoStore().data.uid, score: 5, timestamp: ''
})

// 给电影评分
const rate = async () => {
    ratingDto.value.timestamp = new Date().getTime() / 1000
    await ratingService.rate(ratingDto.value)
    ElMessage.success("评分成功")
}

onMounted(() => {
    getMovieDatail()
})
</script>

<style lang="scss" scoped>
.movie {
    display: flex;
    justify-content: left;

    .poster {
        margin-left: 5vw;
        width: 15vw;
        height: 45vh;

        .image {
            width: 100%;
            height: 100%;
            border: 1px solid #d3dce6;
        }
    }

    .detail {
        width: 50vw;
        margin-left: 5vw;

        .name {
            color: #666;
            width: 100%;
            word-wrap: break-word;
        }

        .description {
            margin-top: 2vh;
            font-size: 14px;
            color: #999;
        }
    }

    .rate {
        display: flex;
        justify-content: right;
        margin-top: 5vh;
    }
}
</style>
