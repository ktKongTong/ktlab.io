import PostLayout from "@/layouts/PostLayout"


export default defineComponent({
  name: 'blogSlug',
  async setup(props, { emit, slots, expose }) {
    const route = useRoute()
      return () => (
        <PostLayout docPath={route.path}/>
      )
  }
})