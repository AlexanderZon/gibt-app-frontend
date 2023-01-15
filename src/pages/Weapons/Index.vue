<template>
    <div>
        Hello Weapons
    </div>
</template>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { ref, reactive, computed, onBeforeMount } from 'vue'

let loading = ref(false)

onBeforeMount(() => {
    loading.value = true
})
</script>