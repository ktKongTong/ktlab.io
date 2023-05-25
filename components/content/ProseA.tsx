import { Link } from '@/components/Link';
export default defineComponent({
  inheritAttrs: false,
    props: {
      href: {
        type: String,
        default: ''
      },
      target: {
        type: String,
        default: undefined,
        required: false
      }
    },
    setup(props, { slots }) {
        const { href, target } = props
      return () => (
            <>
            <Link href={href} class="border-gray-700 dark:border-gray-1 border-b-dashed border-b-1">
                {slots}
            </Link>
            </>
      )
    },
  });