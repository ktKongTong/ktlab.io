import {Link} from './Link'
import {siteMetadata} from '@/data/siteMetadata'

export default defineComponent({
    name: 'MobileNav',
    setup() {


        const headerNavLinks = siteMetadata.headerNavLinks
        const navShow = ref(false)
          const onToggleNav = () => {
            navShow.value = !navShow.value
          }
        return () => (
            <div className="sm:hidden">
                <div className={`ml-4 mr-1 h-4 w-4 block sm:hidden p-1 sm:ml-4 i-mdi-menu`}         onClick={onToggleNav}/>
              <div
                class={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${navShow.value?'translate-x-0':'translate-x-full'}`}
              >
                <div className="flex justify-end">
                  <button
                    className="mr-5 mt-11 h-8 w-8 rounded  i-mdi-close"
                    aria-label="Toggle Menu"
                    onClick={onToggleNav}
                  >
                  </button>
                </div>
                <nav className="fixed mt-8 h-full">
                  {headerNavLinks.map((link) => (
                    <div key={link.title} className="px-12 py-4">
                      <Link
                        href={link.href}
                        className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                        onClick={onToggleNav}
                      >
                        {link.title}
                      </Link>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          )
    }
})
