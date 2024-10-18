import {getBlogPostMetas} from "@/queries/blog";
import {ArticleList} from "@/components/article-list";
import {unstable_cache} from "next/cache";


const getBlogs = unstable_cache(getBlogPostMetas, ['blogs'], {
  revalidate: 3600,
  tags: ['blogs']
})

export default async function Page() {
  const posts =  getBlogs()
  return (
    <div className={'max-w-2xl w-full mx-10'}>
      <div className={'text-3xl font-bold '}>{"文稿"}</div>
      <ArticleList postsPromise={posts}/>
    </div>
  )
}