<script setup>
import Container from '@/components/container'
const route = useRoute()
console.log(route.path)
</script>
<template>
        <Container>
                        <NuxtPage/>
        </Container>
        <div style="display:none;">
                        <div class="i-mdi-email"></div>
                        <div class="i-mdi-github"></div>
                        <div class="i-carbon-sun"></div>
                        <div class="i-carbon-moon"></div>
                        <div class="i-material-symbols:arrow-right-rounded"></div>
                        <div class="i-material-symbols:computer-outline"></div>
                        <div class="i-mdi-open-in-new"></div>
        </div>
</template>
