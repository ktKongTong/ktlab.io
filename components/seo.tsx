import { siteMetadata } from "@/data/siteMetadata"

interface CommonSEOProps {
    title: string
    description: string
    ogType: string
    ogImage:
      string
    // twImage: string
    canonicalUrl?: string
  }
  
  const CommonSEO = ({
    title,
    description,
    ogType,
    ogImage,
    canonicalUrl,
  }: CommonSEOProps) => {
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
                content: ogType,
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
            {
                property: 'og:image',
                content: ogImage,
            },
        ],
    })
    return null
  }
// interface PageSEOProps {
//     title: string
//     description: string
//   }

// export const PageSEO = ({ title, description }: PageSEOProps) => {
//     const ogImageUrl = ""
//     return (
//       <CommonSEO
//         title={title}
//         description={description}
//         ogType="website"
//         ogImage={ogImageUrl}
//       />
//     )
//   }

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

      const ogImageUrl = ""
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
              {
                  property: 'og:image',
                  content: '',
              },
          ],
      })
      return ()=>(
        <div></div>
        )
    }
  })