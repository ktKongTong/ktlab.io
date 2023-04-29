import ArticleCard from "@/components/ArticleCard"
import Image from "@/components/Image"

const notFound = ({data, notFoundTips},context) => {
    return (
      <>
      <div class="divide-y divide-red-200 dark:divide-gray-700">
          <h1> {notFoundTips? notFoundTips : `has no activity recently` }</h1>
          <Image
                src="/not_found_2.png"
                alt="not found"
                class="max-w-full max-h-full  h-a w-a"
            />
      </div>
      </>
    )
  }
export  const ArticleList = ({data, notFoundTips},context) => {
    if (!data || data.length == 0) {
      return notFound({data, notFoundTips},context)
    }
    return (
      <>
        <div class="divide-y divide-red-200 dark:divide-gray-700 ">
            {
                data.map((article) => {
                  return (<ArticleCard
                    title={article.title}
                    description={article.description}
                    date={article.date}
                    tags={article.tags?article.tags:[]}
                    href={article['_path']}
                  ></ArticleCard>)
                })
            }
        </div>
      </>
      )
  }

export default ArticleList