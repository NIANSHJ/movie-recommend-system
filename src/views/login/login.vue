<template>
    <el-card>
        <el-form ref="formRef" size="large" :model="loginDto" :rules="rules">
            <el-form-item>
                <div class="login-avater">
                    <el-avatar :size="100" :src="avaterUrl" />
                </div>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input :prefix-icon="Iphone" placeholder="请输入手机号" v-model="loginDto.phone" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginDto.password"
                    show-password @keyup.enter="submitForm" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" auto-insert-space @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="register-link">
            <el-link :underline="false" href="/register">立即注册
                <el-icon>
                    <Right />
                </el-icon>
            </el-link>
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import userService from '@/modules/login/login'
import router from '@/router'
import userInfoStore from '@/stores/user/userInfo'
import { ElMessage } from 'element-plus'
import { Iphone, Lock, Right } from '@element-plus/icons-vue'

const avaterUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'

//登录数据模型
const loginDto = ref({
    phone: '', password: ''
})

//定义表单校验规则
const rules = ref({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/, message: '8~20位, 至少包含大小写字母和数字', trigger: 'blur' }
    ]
})

const formRef = ref(null)

//校验表单
const submitForm = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            login()
        }
    })
}

//登录
const login = async () => {
    const { data: { token, user } } = await userService.login(loginDto.value)
    ElMessage.success('登录成功')
    const store = userInfoStore()
    const { uid, username, phone } = user
    store.setFieldValue('uid', uid)
    store.setFieldValue('username', username)
    store.setFieldValue('phone', phone)
    store.setFieldValue('token', token)
    router.push('/')
}
</script>

<style lang="scss" scoped>
body {
    background-image: url("@/assets/resources/login-background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.el-card {
    width: 28vw;
    height: 50vh;
}

.el-card .el-form {
    margin: 2%;
}

.login-avater {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-button {
    width: 100%;
    color: #fff;
    background-color: #0052d9;
}

.register-link {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-bottom: 2vh;
}

.el-icon {
    font-size: 1.5rem;
}
</style>