<template>
    <div>
        Hola Mundo
    </div>
</template>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { ref, reactive, computed, onBeforeMount } from 'vue'

let loading = ref(false)

let logout = () => {
    window.api.post('/api/app/auth/logout').then((response: AxiosResponse) => {
        loading.value = false
    }).catch((thrown: AxiosError) => {
        loading.value = false
    })
}

onBeforeMount(() => {
    loading.value = true
})
</script>