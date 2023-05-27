import { Link } from "./Link"
export default defineComponent({
    name: 'BottomNav',
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
            <div class="grid grid-row-auto gap-4 pt-10">
                    <div class="divide-y border-blueGray border-solid border-width-0.1 m-x-2"></div>
                    <div class="tag">
                        <div class="text-sm">🏷️TAGS</div>
                        {
                            <div class="grid grid-cols-2">
                                {tags.map((tag)=>{
                                    return (
                                        <Link  class="m-x-a hover:text-yellow-500  text-yellow-700" href={`/tags/${tag}`}>{tag}</Link>
                                    )
                                })}
                            </div>
                        }
                    </div>

                    <div class="divide-y border-blueGray border-solid border-width-0.1 m-x-2"></div>
                    <div class="justify-between flex">
                    {
                        previous && (
                            <>
                            <div class="m-r-a ml-2">
                                <div class="text-sm">PREVIOUS</div>
                                <Link class="m-x-a  hover:text-yellow-500  text-yellow-700" href={previous?._path}>{previous?.title}</Link>
                            </div>
                            </>
                        )
                    }
                    {
                        next && (
                            <>
                            <div class="m-l-a mr-2">
                                    <div class="text-sm">NEXT</div>
                                    <Link class="m-x-a  hover:text-yellow-500  text-yellow-700" href={next?._path}>{next?.title}</Link>
                            </div>
                            </>
                        )
                    }

                    </div>
                    <div  class="m-l-a mr-2">
                        <Link class="text-sm hover:text-yellow-500  text-yellow-700" href="/blog">CD ../</Link>
                    </div>
            </div>
        )
    },

})