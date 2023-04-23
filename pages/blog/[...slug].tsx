import MDContentRender  from "~/components/MDContentRender"


export default defineComponent({
  name: 'blogSlug',
  async setup(props, { emit, slots, expose }) {
    const route = useRoute()
    
    // const data =await queryContent('blog').sort({date: -1}).where(where).find()
      return () => (
        <MDContentRender docPath={route.path}/>

      )
  }
})