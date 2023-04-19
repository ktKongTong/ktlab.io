import { PageSEO } from '@/components/seo'
import {siteMetadata} from '@/data/siteMetadata'

const MAX_DISPLAY = 3

// export const getStaticProps = async () => {
//   const sortedPosts = sortedBlogPost(allBlogs) as Blog[]
//   const posts = allCoreContent(sortedPosts)

//   return { props: { posts } }
// }

export default function Home({ posts }: any) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
      </div>
    </>
  )
}