import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户信息状态
const userInfoStore = defineStore('userInfo', () => {
    // 初始化信息
    const data = ref({})

    // 修改信息（参数为对象）
    const setData = (new_info) => {
        data.value = new_info
    }

    // 修改信息具体的字段
    const setFieldValue = (field, value) => {
        data.value[field] = value
    }

    // 删除信息
    const removeData = () => {
        data.value = {}
    }

    return { data, setData, setFieldValue, removeData }
}, { persist: true }
)

export default userInfoStore