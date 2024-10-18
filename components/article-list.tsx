import ArticleItem, {ArticleItemProps} from "@/components/article-item";
import {Suspense, use} from "react";
import {Skeleton} from "@/components/ui/skeleton";


interface ArticleListProps {
  postsPromise: Promise<ArticleItemProps[]>;
}
export function ArticleList({postsPromise}:ArticleListProps) {
  const posts = use(postsPromise)
  return (
    <ul className={' group divide-y-1 divide-zinc-200 divide-y'}>
      <Suspense fallback={<Skeleton className={'w-full h-full'}/>}>
        <div className={'pt-10 text-lg  font-medium text-opacity-30'}>共 {posts.length} 篇文稿</div>
        {(posts as ArticleItemProps[]).map((article, index) =>
          <li key={article.link}>
            <ArticleItem {...article} className={'p-4 '}/>
          </li>
        )}
      </Suspense>
    </ul>
  )
}