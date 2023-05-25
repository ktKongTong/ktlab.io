import PageSEO from '@/components/seo'
import {siteMetadata} from '@/data/siteMetadata'
import PageTitle from '@/components/title'
import { ArticleList } from  '@/components/ArticleList'
import { Link } from '@/components/Link'

import { ContentDoc } from '#components'

const MAX_RECENT_ARTICLES = siteMetadata.maxRencentPosts

export default defineComponent({
  name: 'Home',
  async setup(props, { emit, slots, expose }) {
    const data =await queryContent('blog').sort({date: -1}).limit(MAX_RECENT_ARTICLES).find()
      return () => (
          <div class="grid-content-center max-w-5xl m-auto">
                <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
                <div class="divide-y divide-red-200 dark:divide-gray-700">
                  <div class="space-y-2 pt-6 pb-8 md:space-y-5">
                    <PageTitle class="mt-a">{siteMetadata.description}</PageTitle>
                    <ContentDoc path="/"/>
                  </div>
                  <h1 class="text-4xl mt-a"> Latest </h1>
                    <ArticleList data={data} notFoundTips={`has no activity recently`}></ArticleList>
                    <div class="flex">
                      <Link class="ml-auto mr-4 border-gray-700 dark:border-gray-1 border-b-dashed border-b-1 " href="/blog" >👉ALL POST</Link>
                    </div>
                </div>
          </div>
      )
  }
})