import { siteMetadata } from "~/data/siteMetadata"
import Image from "./Image"
import PostNav  from "./PostNav"
import TOC from "./TOC"
import PageTitle from "./title"
import BottomNav from "./BottomNav"



const dateToFormat = (date: string) => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('en', { month: 'short' })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}
// export default MDContentRender

const MD = defineComponent({
  name: 'MD',
  props: {
    docPath: {
        type: String,
        default: ''
    },
  },
  async setup(props, { emit, slots, expose }) {
    const { docPath } = props
    console.log(docPath)
    const [prev, next] = await queryContent()
          .sort({ date: 1})
          .where({ _dir: 'blog' })
          .findSurround(docPath)
    return () => (
      <>
      <ContentDoc path={docPath}>{
         ({doc}) => {
            return (
              <>
                    <div class=" m-auto max-w-7xl">
              {(doc.title && doc.title.length > 0) ? (
                      <div class=" border-b-groove divide-gray-200 dark:divide-gray-700 border-1 text-center">
                        <h2 class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{dateToFormat(doc.date)}</h2>
                        <PageTitle className="mt-1 mb-1">{doc.title}</PageTitle>
                        <div class=" xl:hidden flex  ml-a mr-a justify-center m-y-1">
                        <Image src={siteMetadata.headerImg} alt="avatar" height={48} width={48} className="rounded-full"></Image>
                        <span class=" text-xl font-bold mt-a mb-a ml-4 text-truncate">{siteMetadata.author}</span>
                        </div>
                      </div>) : <div></div>
              }
            <div class="grid-content-center grid grid-cols-12 max-w-7xl m-auto gap-3">
                <div class="col-span-2 xl:block hidden"><PostNav previous={prev} next={next} tags={doc.tags} class="pt-3 sticky top-35"/></div>
                <div   class="col-span-12 xl:col-span-8">
                    <ContentRenderer value={doc} />
                      <div class="col-span-2 xl:hidden"><BottomNav previous={prev} next={next} tags={doc.tags}/></div>
                </div>
                <div  class="col-span-2 xl:block hidden"><TOC class= "pt-3 sticky top-35" toc={doc.body.toc.links} depth={0}/></div>
            </div>
                </div>
              </>
            )
          }
        }
        </ContentDoc>
      </>
    )
  }
})
export default MD
