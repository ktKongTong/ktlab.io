// const CustomLink = ({
//   href,
//   ...rest
// }: any) => {
//   const isInternalLink = href && href.startsWith('/')
//   const isAnchorLink = href && href.startsWith('#')

// //   if (isInternalLink) {
// //     return <a  href={href} {...rest} />
// //   }

// //   if (isAnchorLink) {
// //     return <a href={href} {...rest} />
// //   }

//   return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} >{this.$slots.default()}</a>
// }

// export default CustomLink


export const Link = (props, { slots }) => (
    <a target="_blank" rel="noopener noreferrer" href={props.href} {...props.rest} >{slots.default() }</a>
  );