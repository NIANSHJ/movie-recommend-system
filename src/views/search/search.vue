<template>
    <h2>搜索结果</h2>
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
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import searchService from '@/modules/search/search'

// 路由
const route = useRoute()

// 用户搜索数据模型
const searchDto = ref({
    keywords: route.query.keywords
});

// 电影列表数据
const moviesData = ref([])

// 获取电影列表
const getSearchResult = async () => {
    const { data } = await searchService.search(searchDto.value)
    moviesData.value = data
    moviesData.value.forEach(movie => {
        movie.poster = `/images/${movie.mid}/poster.jpg`
    })
}

onMounted(() => {
    getSearchResult()
})
</script>

<style lang="scss" scoped>
h2 {
    font-weight: lighter;
    margin-top: 0;
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

.router-link {
    text-decoration: none;
}

img {
    width: 100%;
    height: 100%;
}
</style>
