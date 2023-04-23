import {siteMetadata} from '@/data/siteMetadata'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
export default defineComponent({
    name: 'Container',
    setup(props, { emit, slots, expose }) {
        return () => (
            <section className={`h-screen max-w-100% px-4 sm:px-6  xl:px-0`}>
             <div className={` flex flex-col justify-between min-h-screen`}>
            <Header></Header>
              <main className="mb-auto m-x-2 z-1000000">{slots.default?.()}</main>
              <Footer 
                  socialIcons={siteMetadata.socialIcons}
                  author={siteMetadata.author}
                  title={siteMetadata.title}
              ></Footer>
              </div>
              </section>
            )
    }
})