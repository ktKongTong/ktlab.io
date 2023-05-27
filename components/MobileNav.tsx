import Link from '@/components/Link'
import {siteMetadata} from '@/data/siteMetadata'

export default defineComponent({
    name: 'MobileNav',
    setup() {
        const headerNavLinks = siteMetadata.headerNavLinks
        const navShow = ref(false)
        const onToggleNav = () => navShow.value = !navShow.value
        return () => (
            <div class="sm:hidden">
                <div class={`ml-4 mr-1 h-4 w-4 block sm:hidden p-1 sm:ml-4 i-mdi-menu`} onClick={onToggleNav}/>
                <div class={`fixed top-0 left-0 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${navShow.value?'translate-x-0':'translate-x-full'}`}>
                    <div class="flex justify-end">
                        <button
                            class="mr-5 mt-11 h-8 w-8 rounded  i-mdi-close"
                            aria-label="Toggle Menu"
                            type='button'
                            onClick={onToggleNav}
                        />
                    </div>
                    <nav class="fixed mt-8 h-full">
                        {headerNavLinks.map((link) => (
                        <div key={link.title} class="px-12 py-4" onClick={onToggleNav}>
                            <Link
                                href={link.href}
                                class="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                            >{link.title}</Link>
                        </div>
                        ))}
                    </nav>
              </div>
            </div>
          )
    }
})
