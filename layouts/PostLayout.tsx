import { siteMetadata } from "~/data/siteMetadata"
import Avatar from "@/components/Avatar"
import PostNav  from "@/components/PostNav"
import TOC from "@/components/TOC"
import PageTitle from "@/components/title"
import BottomNav from "@/components/BottomNav"
import {dateFormatEn} from "@/utils/utils"
import { Waline } from '@waline/client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import '@waline/client/dist/waline.css';

export default defineComponent({
    name: 'MD',
    props: {
      docPath: {
          type: String,
          default: ''
      },
      nav:{
        type: Boolean,
        default: true
      },
      className:{
        type: String,
        default: ''
      }
    },
    async setup(props, { emit, slots, expose }) {
      const { docPath } = props
      const [prev, next] = await queryContent()
            .sort({ date: 1})
            .where({ _dir: 'blog' })
            .findSurround(docPath)
            
      return () => (
        <>
        <ContentDoc path={docPath}>{({doc}) => {
        const serverURL = siteMetadata.waliineServeUrl;
        const path = computed(() => useRoute().path);
        const color = useColorMode();
              return (
                <>
                    <div class={`${props.className}  m-auto max-w-5xl`}>
                          {(props.nav && doc.title && doc.title.length > 0) ? (
                                  <div class=" border-b-groove divide-gray-200 dark:divide-gray-700 border-1 text-center">
                                    <h2 class="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">{doc.date?dateFormatEn(doc.date):""}</h2>
                                    <PageTitle class="p-0">{doc.title}</PageTitle>
                                    <div class=" lg:hidden flex  ml-a mr-a justify-center m-y-1">
                                    <Avatar src={siteMetadata.headerImg}/>
                                    <span class=" text-xl font-bold mt-a mb-a ml-4 text-truncate">{siteMetadata.author}</span>
                                    </div>
                                  </div>) 
                                  :
                                  <PageTitle>{doc.title}</PageTitle>
                          }
                        {props.nav ? (
                              <div class="grid-content-center grid grid-cols-12 max-w-5xl m-auto gap-3">
                                  <div class="col-span-2 lg:block hidden"><PostNav previous={prev} next={next} tags={doc.tags} class="pt-3 sticky top-25"/></div>
                                  <div   class="col-span-12 lg:col-span-8">
                                      <ContentRenderer value={doc} />
                                      { doc.comments !== false && <Waline class='mt-2' login='disable'  search={false} emoji={siteMetadata.presetEmoji} requiredMeta={['nick', 'mail']} dark={color.value=='dark'} serverURL={serverURL} path={path.value}/>}
                                      <div class="col-span-2 lg:hidden"><BottomNav previous={prev} next={next} tags={doc.tags}/></div>
                                  </div>
                                  <div  class="col-span-2 lg:block hidden"><TOC class= "pt-3 sticky top-25" toc={doc.body.toc.links} depth={0}/></div>
                              </div>
                              ) : (
                                <>
                                  <ContentRenderer value={doc} />
                                  {
                                  doc.comments !== false && <Waline class='mt-2' login='disable'  search={false} emoji={siteMetadata.presetEmoji} requiredMeta={['nick', 'mail']} dark={color.value=='dark'} serverURL={serverURL} path={path.value}/>
                                  }                                
                                </>
                        )}
                    </div>
                </>
              )
            }}
          </ContentDoc>
        </>
      )
    }
})
