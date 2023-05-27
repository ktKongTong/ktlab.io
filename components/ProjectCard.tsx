import LinkIcon from "@/components/icon"
import {NuxtImg} from '#components'

export default defineComponent({
    name: 'ProjectCard',
    props: {
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        preview: {
            type: String,
            default: '/not_found_3.png'
        },

        github: {
            type: String,
            default: ''
        },

        link: {
            type: String,
            default: ''
        }

    },
    setup({ title, description, preview, github, link }) {
      return()=> (
        <>
            <div class="max-w-sm mx-auto bg-white-100 dark:bg-gray-700 md:w-68 lg:w-72 xl:w-80  rounded-xl shadow-md overflow-hidden select-unset hover:scale-105">
            
            <NuxtImg height="10rem" loading="lazy" class={`w-full h-40 select-none ${ preview=='/not_found_3.png' ? 'object-contain':'' }`} src={preview} alt={title}/>
            <div class="px-4 py-2  border-t border-gray-200">
                <div class="border-t border-gray-200 flex justify-between">
                    <div class="text-xl"> {title}</div>
                    <div class="flex">
                        <LinkIcon id="i-mdi-github" href={github} class="h-6 w-6 text-gray-400 mx-2px "/>
                        <LinkIcon id="i-mdi-open-in-new" href={link} class="h-8 w-6 text-gray-400  mx-2 "/>
                    </div>
                </div>
                <p>{description}</p>
            </div>
            </div>
        </>
    )}

})