import { siteMetadata} from "@/data/siteMetadata"
import Avatar from "@/components/Avatar"
import {Link} from "@/components/Link"
import ThemeButton from "@/components/themeButton"
import MobileNav from "@/components/MobileNav"




export default defineComponent({
  name: 'Header',
  setup(props, { emit, slots, expose }) {
      return () => (
            <header class="sticky top-0 bg-primary dark:bg-#091a28  z-8000">
            <div  class="  items-center p-5 max-w-7xl m-auto h-15">
            {/* <div> */}
            <div class="flex  justify-between w-full">
                    {/* Avatar and title */}
                    <Link href="/" aria-label={siteMetadata.headerTitle}>
                        <div class="flex items-center justify-between">
                            <Avatar  class="mr-3" src={siteMetadata.headerImg}/>
                            {typeof siteMetadata.headerTitle === 'string' ? (
                            <div class="hidden h-8 text-2xl font-semibold sm:block">{siteMetadata.headerTitle}</div>
                            ) : (siteMetadata.headerTitle)}
                        </div>
                    </Link>
                    {/* Nav */}
                    <div class="flex items-center text-base leading-5">
                        <div class="hidden sm:block">
                            {
                            siteMetadata.headerNavLinks.map((link:any) => (
                                <Link
                                    key={link.title}
                                    href={link.href}
                                    class="p-1 font-300 text-xl text-gray-900 dark:text-gray-100 sm:p-4"
                                >
                                    {link.title}
                                </Link>
                            ))
                            }
                        </div>
                        <ThemeButton/>
                        <MobileNav/>
                    </div>
                  </div>
                </div>
            </header>
          )
  }
})