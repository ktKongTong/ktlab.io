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
          class={`${props.className} p-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14`}
          >
          {slots.default()}
        </h1>
        )
    }
  })