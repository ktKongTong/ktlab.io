import { Link } from "@/components/Link"
import Tag from "@/components/tag"
import { dateFormatEn } from "@/utils/utils"

export default defineComponent({
    name: 'ArticleCard',
    props: {
        title: {
            type: String,
            default: ''
        }, 
        href: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        date: {
            type: String,
            default: ''
        },
        tags: {
            type: Array<string>,
            default: []
        },
    },
    setup({ title, href, description, date, tags }) {
      return()=> (
        <>
        <div key={href} class="py-4">
            <div class="space-y-2 lg:grid lg:grid-cols-6 lg:items-baseline lg:space-y-0">
              <div>
                <div class="sr-only">Published on</div>
                <div class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time datetime={date}>{dateFormatEn(date)}</time>
                </div>
              </div>
              <div class="space-y-5 lg:col-span-5">
                <div>
                  <h3 class="text-2xl font-bold leading-8 tracking-tight">
                    <Link href={href} class="text-gray-900 dark:text-gray-100">{title}</Link>
                  </h3>
                  <div class="flex flex-wrap">
                      {tags.map((tag) => (
                          <Tag text={tag} href={`/tags/${tag}`} class="flex items-center px-3 py-1 ml-2 mt-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200"/>
                      ))}
                  </div>
                </div>
                <div class=" max-w-none text-gray-500 dark:text-gray-400">{description}</div>
              </div>
            </div>
        </div>
        </>
)
    }

})