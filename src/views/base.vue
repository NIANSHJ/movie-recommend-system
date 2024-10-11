<template>
    <el-container>
        <el-header>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#2c2c2c"
                text-color="#fff" active-text-color="#ffd04b" :ellipsis='false' router>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/movies">电影大全</el-menu-item>
                <div class="flex-grow" />
                <el-menu-item @click="showSearchDialog">
                    <el-icon>
                        <Search />
                    </el-icon>
                </el-menu-item>
                <el-menu-item v-if="!info.token" index="/login">登录 / 注册</el-menu-item>
                <el-sub-menu v-else index="userInfo">
                    <template #title>{{ info.username }}</template>
                    <el-menu-item index="" @click="logout">退出登录</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-header>
        <el-main>
            <RouterView :key="$route.fullPath"></RouterView>
        </el-main>
        <el-backtop>
            <span>
                <el-icon>
                    <ArrowUp />
                </el-icon>
            </span>
        </el-backtop>
        <el-dialog v-model="dialogVisible" title="搜索电影" width="40vw">
            <el-form ref='searchFormRef' :model="searchData" :rules='rules' @submit.prevent>
                <el-form-item prop='keywords'>
                    <el-input v-model="searchData.keywords" :prefix-icon="Search" size="large"
                        @keyup.enter.native="searchMovies" clearable />
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'
import userInfoStore from '@/stores/user/userInfo'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, ArrowUp } from '@element-plus/icons-vue'

// 用户信息
const store = userInfoStore()
const info = store.data

// 用户退出登录
const logout = () => {
    ElMessageBox.confirm(
        '您确认要退出吗?',
        '温馨提示',
        { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
    ).then(() => {
        // 清空Pinia存储的个人信息和token
        store.removeData()
        // 刷新当前页面
        router.go(0)
        ElMessage.success('已退出登录')
    }).catch((error) => { console.log(error) })
}

// 搜索对话框（默认不显示）
const dialogVisible = ref(false)
// 表单
const searchFormRef = ref(null)
// 搜索数据
const searchData = ref({
    keywords: ''
})
// 校验搜索框输入
const checkKeywords = (rule, value, callback) => {
    const trimValue = value.trim();
    if (trimValue.length > 0) {
        searchData.value.keywords = trimValue
        callback()
    }
};
// 定义搜索表单校验规则
const rules = ref({
    keywords: [{ validator: checkKeywords, trigger: 'blur' }]
});

// 显示搜索对话框
const showSearchDialog = () => {
    dialogVisible.value = true
}

// 根据关键词搜索电影
const searchMovies = () => {
    // 校验表单
    searchFormRef.value.validate((valid) => {
        if (valid) {
            dialogVisible.value = false
            router.push({ path: '/search', query: { keywords: searchData.value.keywords } })
        }
    });
}
</script>

<style lang="scss" scoped>
.el-container {
    min-height: 100vh;
}

.el-header {
    padding: 0;
}

.el-menu {
    padding: 0 8vw;

    .flex-grow {
        flex-grow: 1;
    }
}

.el-backtop {
    width: 45px;
    height: 45px;
    color: #B0B0B0;
    font-size: 30px;
    margin: 0 auto 5vh;
}

.el-main {
    margin: 0 8vw;
}
</style>