import ArticleItem, {ArticleItemProps} from "@/components/article-item";
import {Suspense, use} from "react";
import {Skeleton} from "@/components/ui/skeleton";


interface ArticleListProps {
  postsPromise: Promise<ArticleItemProps[]>;
}
export function ArticleList({postsPromise}:ArticleListProps) {
  const posts = use(postsPromise)
  return (
    <div>
      <div className={'pt-10 text-lg  font-medium text-opacity-30'}>共 {posts.length} 篇文稿</div>
      <ul className={' group divide-zinc-200 divide-y divide-primary-foreground'}>
        <Suspense fallback={<Skeleton className={'w-full h-full'}/>}>
          {posts.map((article, index) =>
            <li key={article.slug}>
              <ArticleItem {...article} className={'p-2'}/>
            </li>
          )}
        </Suspense>
      </ul>
    </div>
  )
}