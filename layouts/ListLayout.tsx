import { ArticleList } from  '~/components/ArticleList'
import PageTitle from '~/components/title'
import { useSearch } from '~/composables/states'



export const PostListLayout = ({data, title,pageSize = 3}) => {
  const route = useRoute()
  let currentPage = 1
  const searchValue = useSearch()
  const filteredBlogPosts = computed(() => {
      return data.filter((post) => {
        const searchContent = post.title + post?.describtion + post.tags?.join(' ')
        return searchContent.toLowerCase().includes(searchValue.value)
    })
  })
    switch (typeof route.query.page) {
      case "string" :
        currentPage = parseInt(route.query.page as string)
        if (isNaN(currentPage)) {
          currentPage = 1
        }
        break
      case "object":
        currentPage = parseInt((route.query.page as string[])[0])
        if (isNaN(currentPage)) {
          currentPage = 1
        }
    }
    const totalPage = computed(() => {return Math.ceil(filteredBlogPosts.value.length / pageSize)})
    const dispalyPosts = computed(() => {
      return filteredBlogPosts.value.slice((currentPage-1)*pageSize, currentPage*pageSize)
    })
        return (
        <>
            <div class="grid h-full">
            <PageTitle>{title?title:"All Post"}</PageTitle>
                  <div class="flex flex-col">
                    <label class="flex max-w-lg">
                      <span class="sr-only">Search articles</span>
                      <input
                      v-model={searchValue.value}
                        aria-label="Search articles"
                        type="text"
                        placeholder="Search articles"
                        class="block w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-1 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                      />
                    {/* <div class="i-mdi-search ml--3 relative text-2xl right-3 top-1.5 text-gray-400 dark:text-gray-300" /> */}
                  </label>
                <ArticleList key={dispalyPosts.value} data={dispalyPosts.value} notFoundTips={"No Result Found"}></ArticleList>
                  </div>
                {/* add page operate next/previous */}
                {/* should be bottom if not fill height */}
                <PageOperate currentPage={currentPage} totalPage={totalPage}
                class="mt-auto"
                ></PageOperate>
            </div>
        </>
        )

}


const PageOperate = ({currentPage, totalPage}) => {
  const router = useRouter()
  const route = useRoute()
  const pageSwitch = (pageCnt:number) => {
    let query = Object.assign({},route.query)
    query.page = (currentPage + pageCnt).toString()
    router.push({
      path: route.path,
      query,
    })
  }
 const color = useColorMode()
 const colorGroup = computed(() => {
    if(color.value == "dark"){
      return ["text-gray-300 cursor-pointer", "text-gray-700 cursor-default"]
    }
    // active inactive
    return ["text-gray-700 cursor-pointer", "text-gray-300  cursor-default"]
 })
  if (totalPage > 1) {
    return (
      <div class="flex justify-between">
      <div
      onClick={() => {if (currentPage > 1) pageSwitch(-1)}}
      class={`${currentPage !== 1 ? colorGroup.value[0] : colorGroup.value[1]}`}
      >
          Previous
      </div>
      <div> 
          {currentPage} of {totalPage}
      </div>
      <div
      onClick={()=>{if (currentPage < totalPage) pageSwitch(1)}}
      class={`${currentPage !== totalPage ? colorGroup.value[0] : colorGroup.value[1]}`}
      >  Next </div>
    </div>
    )
  }
}
