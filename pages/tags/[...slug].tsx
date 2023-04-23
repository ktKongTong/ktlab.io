import { PageSEO } from "~/components/seo"
import { siteMetadata } from "~/data/siteMetadata"
import { PostListLayout } from "~/layouts/ListLayout"

export default defineComponent({
    name: 'tagSlug',
    async setup(props, { emit, slots, expose }) {
      const route = useRoute()
      const tag = route.path.replace("/tags/","")
      const where = {
        tags: {
          $in: [tag]
        }
      }
      const data =await queryContent('blog').sort({date: -1}).where(where).find()
        return () => (
        <>
          <PageSEO title={`🏷️Tags - ${tag}`} description={siteMetadata.description} />

          <div class="grid-content-center max-w-5xl m-auto">
          <PostListLayout data={data} title={`🏷️ ${tag}`}></PostListLayout>
          </div>
        </>
        )
    }
})