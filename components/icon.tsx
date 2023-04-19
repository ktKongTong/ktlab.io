export interface IconProps {
    id: string
    primarycolor: string | undefined
    source: 'solid' | 'brands' | 'regular' |string
    size?: 'xs' | 'sm' | '2xs' | 'lg' | 'xl' | '2xl' | undefined
    href: string
}


const FaIcon = ({id,primarycolor,source,size,href} : IconProps) => {
    return (
      <>
      <a
            className="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="sr-only">{id}</span>
            <font-awesome-icon icon={`fa-${source} fa-${id}`}/>
      </a>
      </>
    )
  }
  
  export default FaIcon