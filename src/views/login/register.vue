<template>
    <el-card>
        <el-form ref='formRef' size='large' :model='registerDto' :rules='rules'>
            <el-form-item>
                <div class="login-avater">
                    <el-avatar :size="100" :src="avaterUrl.URL" />
                </div>
            </el-form-item>
            <el-form-item prop='phone'>
                <el-input :prefix-icon='Iphone' placeholder='请输入手机号' v-model='registerDto.phone' clearable></el-input>
            </el-form-item>
            <el-form-item prop='password'>
                <el-input :prefix-icon='Lock' type='password' placeholder='请输入密码' v-model='registerDto.password'
                    show-password clearable></el-input>
            </el-form-item>
            <el-form-item prop='repassword'>
                <el-input :prefix-icon='Lock' type='password' placeholder='请输入确认密码' v-model='registerDto.repassword'
                    show-password @keyup.enter="submitForm" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-button" auto-insert-space @click="submitForm()">注册</el-button>
            </el-form-item>
        </el-form>
        <div class="login-link">
            <el-link :underline='false' href='/login'>登录
                <el-icon>
                    <Back />
                </el-icon>
            </el-link>
        </div>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
import userService from '@/modules/login/login'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { Iphone, Lock, Back } from '@element-plus/icons-vue'

const avaterUrl = ref({
    URL: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
})

//登录数据模型
const registerDto = ref({
    phone: '', password: '', repassword: ''
})

//校验确认密码的函数
const checkRepassword = (rule, value, callback) => {
    if (value !== registerDto.value.password) {
        callback(new Error('两次输入的密码不一致，请重新输入'))
    }
    else {
        callback()
    }
}

//定义表单校验规则
const rules = ref({
    phone: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/, message: '8~20位, 至少包含大小写字母和数字', trigger: 'blur' }
    ],
    repassword: [
        { validator: checkRepassword, trigger: 'change' },
    ]
})

const formRef = ref(null)

//校验表单
const submitForm = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            register()
        }
    })
}

//登录
const register = async () => {
    await userService.register(registerDto.value)
    ElMessage.success('注册成功')
    router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-card {
    width: 28vw;
    height: 60vh;
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

.login-link {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 2vh;
}

.el-icon {
    font-size: 1.5rem;
}
</style>