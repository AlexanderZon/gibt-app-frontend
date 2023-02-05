<template>
    <div>
        Hola Mundo
    </div>
</template>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useDashboardStore } from '@/stores/dashboard/index'
import { useRouter } from 'vue-router'

const store$ = useDashboardStore()
const router = useRouter()

let loading = ref(false)

onBeforeMount(async () => {
    await store$.get()
})
</script>