import { PageSEO } from '@/components/seo'
import {siteMetadata} from '@/data/siteMetadata'
import { ArticleList } from  '~/components/ArticleList'
import PageTitle from '~/components/title'
import { useSearch } from '~/composables/states'
export const PostListLayout = ({data, title}) => {
    let  PageSize = 5
    const searchValue = useSearch()
    const filteredBlogPosts = data.filter((post) => {
        const searchContent = post.title + post?.describtion + post.tags?.join(' ')
        return searchContent.toLowerCase().includes(searchValue.value)
    })
    const dispalyPosts = filteredBlogPosts.slice(0, PageSize)
        return (
        <>
            <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
            <div class="divide-y divide-red-200 dark:divide-gray-700">
              <PageTitle>{title?title:"All Post"}</PageTitle>
              <div className="relative max-w-lg">
                <label class="flex">
                  <span className="sr-only">Search articles</span>
                  <input
                   v-model={searchValue.value}
                    aria-label="Search articles"
                    type="text"
                    placeholder="Search articles"
                    className="block w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  />
                </label>
                <div class="i-mdi-search absolute text-2xl right-3 top-1.5 text-gray-400 dark:text-gray-300" />
                </div>
                <ArticleList data={dispalyPosts} notFoundTips={"No Result Found"}></ArticleList>
            </div>
        </>
        )

}