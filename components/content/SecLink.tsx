import { Link } from "@/components/Link";
import { ContentSlot } from "#components";
export default defineComponent({
    name: 'SecLink',
    setup:(props,{slots})=>{
        return ()=>(
            <>
            <Link 
                href="/"
                class="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
            >
                <ContentSlot use={slots.default} unwrap="p" />
            </Link>
            </>
        )
    }
})