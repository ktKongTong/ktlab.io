import { PageSEO } from "~/components/seo"
import { siteMetadata } from "~/data/siteMetadata"
import { PostListLayout } from "~/layouts/ListLayout"
import { queryContent } from "#imports";

export default defineComponent({
    name: 'Blog',
    async setup(props, { emit, slots, expose }) {
      const data =await queryContent('blog').sort({date: -1}).find()
        return () => (
        <>
          <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
          
          <div class="grid-content-center max-w-5xl m-auto">
          <PostListLayout data={data} title="All Posts" pageSize={3} />
          </div>

        </>
        )
    }
})