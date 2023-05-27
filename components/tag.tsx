import Link from "@/components/Link"

export default defineComponent({
    name: 'Tag',
    props: {
        text: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: ''
        },
    },
    setup({ text, href }) {
        return () => (
            <Link href={href} class="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">{text}</Link>
        )
    }
})