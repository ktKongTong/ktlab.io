import { PageSEO } from '@/components/seo'
import {siteMetadata} from '@/data/siteMetadata'
import { MDContentRender } from '~/components/MDContentRender'
import PageTitle from '~/components/title'
import { ArticleList } from  '~/components/ArticleList'
const MAX_RECENT_ARTICLES = siteMetadata.maxRencentPosts

export default function Home(props:any) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div class="divide-y divide-red-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <PageTitle>{siteMetadata.description}</PageTitle>
          <MDContentRender docPath="/"/>
        </div>
        <h1 className="text-4xl"> Latest </h1>
        <ContentQuery path="/blog" sort={ {date: -1} } limit={MAX_RECENT_ARTICLES} v-slots={ArticleList} />
      </div>
    </>
  )
}