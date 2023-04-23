import { siteMetadata} from "@/data/siteMetadata"
import Image from "@/components/Image"
import {Link} from "./Link"
import ThemeButton from "./themeButton"
import MobileNav from "./MobileNav"


export const Header = () => {
    return (
      <header class="sticky top-0 z-10000000000000 bg-primary dark:bg-#091a28">
            <div  className="  items-center p-10 max-w-7xl m-auto h-15">
             {/* <div> */}
             <div class="flex  justify-between w-full">
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                      <Image
                          src={siteMetadata.headerImg}
                          alt="avatar"
                          width={48}
                          height={48}
                          className="rounded-full"
                      />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div class="hidden h-8 text-2xl font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
                
              </Link>
             {/* </div> */}
                            <div className="flex items-center text-base leading-5">
                                              <div className="hidden sm:block">
                                                {
                                                  siteMetadata.headerNavLinks.map((link:any) => (
                                                    <Link
                                                      key={link.title}
                                                      href={link.href}
                                                      className="p-1 font-300 text-xl text-gray-900 dark:text-gray-100 sm:p-4"
                                                    >
                                                      {link.title}
                                                    </Link>
                                                ))
                                                }
                                              </div>
                                              <ThemeButton></ThemeButton>
                                              <MobileNav></MobileNav>
                            </div>
              </div>
            </div>
      </header>

    )
  }