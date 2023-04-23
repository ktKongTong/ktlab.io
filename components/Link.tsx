
export const Link = defineComponent({
    name: 'Link',
    inheritAttrs: true,
    props: {  
      href: {
        type: String,
        default: ''
      },
      target: {
        type: String,
        default: undefined,
        required: false
      },
      className: {
        type: String,
        default: ''
      }
    },
    setup(props, { slots }) {
      const isInternalLink = props.href && props.href.startsWith('/')
      const isAnchorLink = props.href && props.href.startsWith('#')
        if (isInternalLink) {
          return ()=>(
            <a href={props.href} ref="noopener noreferrer"  class={` ${props.className}`} >{slots.default() }</a>
        )
      }
      if (isAnchorLink) {
        return ()=>(
        <a href={props.href} rel="noopener noreferrer" class={`${props.className}`} >{slots.default() }</a>
        )
      }
      return ()=>(
        <a target="_blank" ref="noopener noreferrer"  href={props.href} class={`${props.className}`} >{slots.default() }</a>
      )
    }
})