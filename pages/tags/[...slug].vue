<script setup>
import {  PostListLayout } from "@/layouts/ListLayout";
const route = useRoute()
const tag = route.path.replace("/tags/","")
const where = {
  tags: {
    $in: [tag]
  }
}
</script>

  <template>
          <ContentQuery path="/blog" :sort="{date: -1}" :where="where" v-slot="{data}">
            <PostListLayout :data="data" :title="tag"></PostListLayout>
            </ContentQuery>
  </template>
  