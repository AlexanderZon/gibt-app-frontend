<template>
    <q-footer elevated
        class="bg-grey-8 text-white">
        <q-toolbar>
            <q-toolbar-title>
                <div class="row">
                    <q-avatar>
                        <img :src="logo">
                    </q-avatar>
                    <div class="q-ml-sm">Genshin Impact Building Tool</div>
                </div>
            </q-toolbar-title>
        </q-toolbar>
    </q-footer>
</template>

<script setup lang="ts">
const logo = new URL('@/assets/logo.png', import.meta.url).href
</script>

<style lang="sass">
.q-footer 
    position: fixed !important
    bottom: 0px
</style>