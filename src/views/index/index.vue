<template>
    <div v-if="recommendations.streamingRecommendations.length > 0">
        <h2>猜你喜欢</h2>
        <div>
            <el-row :gutter="25">
                <el-col v-for="movie in recommendations.streamingRecommendations" :key="movie.mid" :span="4">
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
        </div>
    </div>
    <div v-if="recommendations.offlineRecommendations.length > 0">
        <h2>精选推荐</h2>
        <div>
            <el-row :gutter="25">
                <el-col v-for="movie in recommendations.offlineRecommendations" :key="movie.mid" :span="4">
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
        </div>
    </div>
    <div>
        <h2>热门推荐</h2>
        <div>
            <el-row :gutter="30">
                <el-col v-for="movie in recommendations.hotRecommendations" :key="movie.mid" :span="4">
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
        </div>
    </div>
    <div>
        <h2>高分电影</h2>
        <div>
            <el-row :gutter="25">
                <el-col v-for="movie in recommendations.highScoreRecommendations" :key="movie.mid" :span="4">
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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import recommendService from '@/modules/recommend/recommend'

// 推荐列表数据
const recommendations = ref({
    streamingRecommendations: [],
    offlineRecommendations: [],
    hotRecommendations: [],
    highScoreRecommendations: []
})

// 获取推荐列表
const getRecommendation = async () => {
    const { data: { streamingRecommendations, offlineRecommendations, hotRecommendations, highScoreRecommendations } } = await recommendService.recommend()
    // 设置电影数据和海报图
    streamingRecommendations?.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
        recommendations.value.streamingRecommendations.push(movie)
    })
    offlineRecommendations?.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
        recommendations.value.offlineRecommendations.push(movie)
    })
    hotRecommendations?.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
        recommendations.value.hotRecommendations.push(movie)
    })
    highScoreRecommendations?.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
        recommendations.value.highScoreRecommendations.push(movie)
    })
}

onMounted(() => {
    getRecommendation()
})
</script>

<style lang="scss" scoped>
h2 {
    font-weight: lighter;
    margin-top: 0;
}

.router-link {
    text-decoration: none;
}

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

img {
    width: 100%;
    height: 100%;
}
</style>