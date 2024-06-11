import ArticleItem, {ArticleItemProps} from "@/components/article-item";
import {notFound} from "next/navigation";
import {getBlogPosts} from "@/queries/blog";


export default async function Page(
  {
    params
  }:{
    params: {
      id: string
    }
  }) {
  const posts = await getBlogPosts();
  if(!posts || !posts.length) {
    notFound()
  }
  return (
    <div className={'max-w-2xl w-full  mx-10'}>
      <div className={'text-3xl font-bold '}>{"文稿"}</div>
      <div className={'pt-10 text-lg  font-medium text-opacity-30'}>共 {posts.length} 篇文稿</div>
      <ul className={'pt-8 group'}>
        {(posts as ArticleItemProps[]).map((article,index)=>
          <ArticleItem {...article} key={index} className={'p-4 '}/>
        )}
      </ul>
    </div>
  )
}