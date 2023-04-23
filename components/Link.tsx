export const Link = (props, { slots }) => {
  const isInternalLink = props.href && props.href.startsWith('/')
  const isAnchorLink = props.href && props.href.startsWith('#')
    if (isInternalLink) {
      return (
        <a href={props.href} className={` ${props.className}`} >{slots.default() }</a>
    )
  }
  if (isAnchorLink) {
    return (
    <a href={props.href} className={`${props.className}`} >{slots.default() }</a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={props.href} class={`${props.className}`} >{slots.default() }</a>
  )
};