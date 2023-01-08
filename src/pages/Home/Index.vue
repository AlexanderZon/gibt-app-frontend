<template>
    <div>
        Hola Mundo
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'

let loading = ref(false)

onBeforeMount(() => {
    loading.value = true
    window.api.get('/auth/login').then((response: any) => {
        loading.value = false
    })
})
</script>