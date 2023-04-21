import { Link } from "./Link"

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

    // <li key={path} className="py-4">
            //     <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
            //       <dl>
            //         <dt className="sr-only">Published on</dt>
            //         <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            //           <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            //         </dd>
            //       </dl>
            //       <div className="space-y-3 xl:col-span-3">
            //         <div>
            //           <h3 className="text-2xl font-bold leading-8 tracking-tight">
            //             <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
            //               {title}
            //             </Link>
            //           </h3>
            //           <div className="flex flex-wrap">
            //             {tags.map((tag) => (
            //               <Tag key={tag} text={tag} />
            //             ))}
            //           </div>
            //         </div>
            //         <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            //           {summary}
            //         </div>
            //       </div>
            //     </article>
            //   </li>


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
                          <a
                            key={tag}
                            href={`/tags/${tag}`}
                            className="flex items-center px-3 py-1 ml-2 mt-1 text-sm font-medium leading-5 text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
                        >
                            {tag}
                        </a>
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

        // <div className="flex flex-row p-4">
        //         <div className="flex pr-10 mt-5 text-2xl font-medium leading-5 text-gray-500 dark:text-gray-400">
        //             {dateToFormat(date)}
        //         </div>
        //     <div className= "flex-col">
        //     <div className="flex-1">
        //         <a href={href} className="block mt-2">
        //             <p className="text-xl font-semibold text-gray-800 dark:text-white">
        //                 {title}
        //             </p>
        //             <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
        //                 {description}
        //             </p>
        //         </a>
        //     </div>
        //     <div className="flex items-center justify-between mt-6">
        //         <div className="flex">
        //             {tags.map((tag) => (
                        // <a
                        //     key={tag.name}
                        //     href={tag.href}
                        //     className="flex items-center px-3 py-1 ml-2 text-sm font-medium leading-5 text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"
                        // >
                        //     {tag.name}
                        // </a>
        //             ))}
        //         </div>
        //     </div>
        //     </div>

        // </div>
    )
}