<template>
        <Container>
                <NuxtPage/>
        </Container>
        <!-- <div style="display:none;">
                <div v-for="icon in siteMetadata.icons" :class="icon" />
        </div> -->
</template>

<script setup>
import Container from '@/components/container'
import {siteMetadata} from '@/data/siteMetadata'


</script>