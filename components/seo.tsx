import { siteMetadata } from "@/data/siteMetadata"

export const PageSEO = defineComponent({
    name: 'SEO',
    props: {
        title: {
          type: String,
          default: ''
        },
        description: {
          type: String,
          default: ''
    },
    },
    setup({ title, description}) {
      const router = useRouter()
      useHead({
          title: title,
          meta: [
              {
                  name: 'robots',
                  content: 'follow, index',
              },
              {
                  name: 'description',
                  content: description,
              },
              {
                  property: 'og:url',
                  content: `${siteMetadata.siteUrl}${router.currentRoute.value.fullPath}`,
              },
              {
                  property: 'og:type',
                  content: 'website',
              },
              {
                  property: 'og:image',
                  content: siteMetadata.thumbImg,
              },
              {
                  property: 'og:site_name',
                  content: siteMetadata.title,
              },
              {
                  property: 'og:description',
                  content: description,
              },
              {
                  property: 'og:title',
                  content: title,
              },
          ],
      })
      return ()=>(
        <div></div>
        )
    }
})
export default PageSEO