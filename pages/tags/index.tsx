import PageSEO from '@/components/seo'
import Tag from '@/components/tag'
import {siteMetadata} from '@/data/siteMetadata'
import PageTitle from '@/components/title'



export default defineComponent({
    name: 'Tags',
    async setup() {
        const posts = await queryContent('blog').sort({date: -1}).find()
      return () => (
          <>
          <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
          <div class="grid-content-center max-w-5xl m-auto">
          <div class="space-y-2 pt-6 pb-8 md:space-y-5">
              <PageTitle>Tags</PageTitle>
            </div>
            <TagList posts={posts}/>
          </div>
        </>
      )
    }
})

const TagList = defineComponent({
    name: 'TagList',
    props:{
        posts:{
            type:Array,
            default:()=>[]
        }
    },
    setup({posts}, ctx) {
        const res = posts.filter(post => post.tags).map(post => post.tags).flat().reduce((tags, tag) => {
            const count = tags[tag]
            tags[tag] = count ? count + 1 : 1
            return tags
        }, {})
        const sortedTags = Object.keys(res).sort((a, b) => res[b] - res[a])
        return ()=>(
            <>
            <div class="flex flex-wrap">
                {Object.keys(sortedTags).length === 0 && 'No tags found.'}
                {
                    sortedTags.map((name) => {
                        const cnt = res[name]
                        return (
                            <Tag
                                text={`${name} (${cnt})`}
                                href={`/tags/${name}`}
                                class="text-xl font-semibold text-gray-600 dark:text-gray-300 mt-2 mb-2 mr-5 border-red-3"
                            />
                        )
                    })
                }
            </div>
            </>
        )
    }
})
