export default defineComponent({
    name: 'PageTitle',
    props: {
      className: {
        type: String,
        default: ''
      }
    },
    setup(props, { slots, emit, expose }) {
        return() =>(
          <h1 
          class="p-0 text-3xl leading-9 tracking-tight text-gray-900 dark:text-gray-100"
          >
          {slots.default()}
        </h1>
        )
    }
  })