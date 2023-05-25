import ArticleCard from "@/components/ArticleCard"
import {NuxtImg} from '#components'
const notFound = defineComponent({
  name: 'notFound',
  props: {
    imageSrc: {
      type: String,
      default: '/not_found_2.png'
    },
    notFoundTips: {
      type: String,
      default: 'has no activity recently'
    }
  },
  setup({imageSrc,notFoundTips}, { emit, slots, expose }) {
    return () => (
      <>
          <h1> {notFoundTips}</h1>
          <NuxtImg
                src={imageSrc}
                alt="not found"
                class="w-1/2"
            />
      </>
    )
  }
})

  export const ArticleList = defineComponent({
    name: 'ArticleList',
    props: {
      data: {
        type: Array,
        default: []
      },
      notFoundTips: {
        type: String,
        required: false,
        default: 'has no activity recently'
      }
    },
    setup({data,notFoundTips}, { emit, slots, expose }) {

      if (!data || data.length == 0) {
        return () => (
          <>
            {slots.default?.() || <notFound notFoundTips={notFoundTips}/>}
          </>
        )
      }
      return () => (
          <>
          <div class="divide-y dark:divide-gray-700 ">
              {
                  data.map((article:any) => {
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
  })
export default ArticleList