import {siteMetadata} from '@/data/siteMetadata'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default defineComponent({
    setup(props, { emit, slots, expose }) {
        return () => (
            <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
             <div className={` flex h-screen flex-col justify-between font-sans`}>
            <Header></Header>
              {/* <main className="mb-auto">{slots.default?.()}</main> */}
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