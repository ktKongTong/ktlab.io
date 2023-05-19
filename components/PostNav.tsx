import { siteMetadata } from "~/data/siteMetadata"
import Avatar from "~/components/Avatar"
import { Link } from "./Link"

export default defineComponent({
    name: 'PostNav',
    props:{
        tags:{
            type:Array,
            default:()=>[]
        },
        previous:{
            type:Object||null,
            default:()=>{}
        },
        next:{
            type:Object||null,
            default:()=>{}
        }
    },
    setup({tags, previous,next}, ctx) {
        tags = tags || []
        return ()=>(
            <div class="grid grid-row-auto gap-4">
                    <div class="flex overflow-auto">
                        <Avatar src={siteMetadata.headerImg}/>
                        <div class="ml-4 text-xl font-bold text-center mt-a mb-a text-truncate">{siteMetadata.author}</div>
                    </div>
                    <div class="divide-y border-blueGray border-solid border-width-0.1 m-x-2"></div>
                    <div class="tag">
                        <div class="text-sm">🏷️TAGS</div>
                        {
                            <div class="flex flex-wrap">
                                {tags.map((tag)=>{
                                    return (
                                        <Link  className="m-x-a hover:text-yellow-500  text-yellow-700  dark:text-primary text-ellipsis" href={`/tags/${tag}`}>{tag}</Link>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    {
                        previous && (
                            <>
                                <div class="divide-y border-blueGray border-solid border-width-0.1 m-x-2"></div>
                                <div>
                                    <div class="text-sm">PREVIOUS</div>
                                    <Link className="m-x-a  hover:text-yellow-500  text-yellow-700  dark:text-primary" href={previous?._path}>{previous?.title}</Link>
                                </div>   
                            </>
                        )
                    }
                    {
                        next && (
                            <>
                                <div>
                                    <div class="text-sm">NEXT</div>
                                    <Link className="m-x-a  hover:text-yellow-500  text-yellow-700 dark:text-primary" href={next?._path}>{next?.title}</Link>
                                </div>                            
                            </>
                        )
                    }
                        <div class="divide-y border-blueGray border-solid border-width-0.1 m-x-2"></div>
                        <div>
                            <Link className="text-sm hover:text-yellow-500  text-yellow-700 dark:text-primary" href="/blog">CD ../</Link>
                        </div>
            </div>
        )
    },

})

