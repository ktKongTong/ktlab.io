import { Link } from "./Link"
import { Tag } from "./tag"

interface Props {
    title: string
    href: string
    description: string
    date: string
    tags: string[]
}

interface Tag {
    name: string
    href: string
}
const dateToFormat = (date: string) => {
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('en', { month: 'short' })
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
}
export const ArticleCard = ({title,href,description,date,tags}:Props) => {
    return (
            <>
            <div key={href} className="py-4">

            <div className="space-y-2 xl:grid xl:grid-cols-6 xl:items-baseline xl:space-y-0">
                  <div>
                    <div className="sr-only">Published on</div>
                    <div className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{dateToFormat(date)}</time>
                    </div>
                  </div>
                  <div className="space-y-5 xl:col-span-5">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link href={href} className="text-gray-900 dark:text-gray-100">
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap">
                        {tags.map((tag) => (
                            <Tag text={tag} href={`/tags/${tag}`}
                            className="flex items-center px-3 py-1 ml-2 mt-1 text-sm font-medium leading-5 text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
                            />
                        ))}
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      {description}
                    </div>
                  </div>
                </div>
            </div>
            </>
    )
}

export default ArticleCard