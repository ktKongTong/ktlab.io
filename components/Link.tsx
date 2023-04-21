export const Link = (props, { slots }) => {
  const isInternalLink = props.href && props.href.startsWith('/')
  const isAnchorLink = props.href && props.href.startsWith('#')
  console.log(props)
    if (isInternalLink) {
      return (
        <a href={props.href} className={`${props.className} link`} >{slots.default() }</a>
    )
  }
  if (isAnchorLink) {
    return (
    <a href={props.href} className={`${props.className} link`} >{slots.default() }</a>
    )
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={props.href} className={`${props.className}`} >{slots.default() }</a>
  )
};