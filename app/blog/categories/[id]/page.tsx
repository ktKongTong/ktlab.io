import ArticleItem, {ArticleItemProps} from "@/components/article-item";
import {notFound} from "next/navigation";
import {getBlogPostsByCategory} from "@/queries/blog";

export default async function Page(
{
    params
}:{
  params: {
    id: string
  }
}) {
  const posts = await getBlogPostsByCategory(params.id);
  if(!posts || !posts.length) {
    notFound()
  }
  return (
    <div className={'max-w-2xl w-full  mx-10'}>
      <div className={'text-3xl font-bold '}>{params.id}</div>
      <div className={'pt-10 text-lg  font-medium text-opacity-30'}>共 {posts.length} 篇文稿</div>
      <ul className={'pt-8 group'}>
        {(posts as ArticleItemProps[]).map((article,index)=>
          <ArticleItem key={index} {...article}  className={'p-4'}/>
        )}
      </ul>
    </div>
  )
}