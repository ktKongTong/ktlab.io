import { Link } from '../Link';
export default defineComponent({
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
        let { href, target } = props
      return () => (
            <>
            <Link href={href} rel={target} class="border-gray-700 dark:border-gray-1 border-b-dashed border-b-1">
                {slots}
            </Link>
            </>
      )
    },
  });