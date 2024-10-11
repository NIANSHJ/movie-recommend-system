import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/base.vue'),
      meta: { title: '电影推荐系统' },
      children: [
        { path: '/', name: 'indexVue', component: () => import('@/views/index/index.vue'), meta: { title: '电影推荐系统 - 首页' } },
        { path: '/movies', name: 'moviesVue', component: () => import('@/views/movie/movies.vue'), meta: { title: '电影推荐系统 - 电影大全' } },
        { path: '/movie', name: 'movieVue', component: () => import('@/views/movie/movie.vue'), meta: { title: '电影推荐系统 - 电影详情' } },
        { path: '/search', name: 'searchVue', component: () => import('@/views/search/search.vue'), meta: { title: '电影推荐系统 - 搜索结果' } }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/base.vue'),
      children: [
        { path: '/login', name: 'LoginVue', component: () => import('@/views/login/login.vue'), meta: { title: '登录 - 电影推荐系统' } },
        { path: '/register', name: 'RegisterVue', component: () => import('@/views/login/register.vue'), meta: { title: '注册 - 电影推荐系统' } },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})

export default router
