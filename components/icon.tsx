export default defineComponent({
    name: 'LinkedIcon',
    props: {
        id: {
            type: String,
            default: ''
        },
        href: {
            type: String,
            default: ''
        },
    },
    setup({id,href}) {
      return ()=>(
        <>
        <a
              class="text-sm text-gray-500 transition hover:text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
              href={href}
          >
              <span class="sr-only">{id}</span>
              <div class={`i-${id}  text-3xl`} />
        </a>
        </>
      )
    }
})