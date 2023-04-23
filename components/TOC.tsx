
const TOC =  defineComponent({
    name: 'TOC',
    props: {
        toc: {
            type: Array,
            default: () => []
        },
        sub:{
            type:Boolean,
            default:false,
        },
        depth:{
            type:Number,
            default:0,
        }
    },
    setup(props, { emit, slots, expose }) {
        if (  props.toc==undefined ||props.toc.length == 0) {
            return () => (<div></div>)
        }
        const visible = ref(false)
        const toggle = () => {
            visible.value = !visible.value
        }
        return () => (
            <div>
                {(props.sub?null:<div class="toc-title">Table of Contents</div>)}
                <div class="toc-content">
                        {props.toc.map((item: any) => {
                            return (
                                <div>
                                    <div class="grid grid-cols-10">
                                        <div class={` col-span-8 text-truncate indent-${4*props.depth}`}>
                                        <a href={`#${item.id}`} >{`${item.text}`}</a>
                                        </div>

                                        {item.children?.length > 0 ? (
                                        <div class={`col-span-2 i-material-symbols:arrow-right-rounded ${visible.value?'rotate-90':''} text-xl mb-a mt-a`} onClick={toggle}></div>                                        
                                        ):null}
                                    </div>
                                    <TOC toc={item.children} sub={true} depth={props.depth + 1} class={`${visible.value?' ':'invisible'}`}></TOC>
                                </div>
                            )
                        })}
                </div>
            </div>
        )

    }
})

export default TOC