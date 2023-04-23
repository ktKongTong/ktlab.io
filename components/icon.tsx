export interface IconProps {
    id: string
    dark?: string
    primarycolor: string | undefined
    source: 'solid' | 'brands' | 'regular' |string
    size?: 'xs' | 'sm' | '2xs' | 'lg' | 'xl' | '2xl' | undefined
    href: string
}


const LinkedIcon = ({id,dark,primarycolor,source,size,href} : IconProps) => {
  const icon = `i-${id}`
    return (
      <>
      <a
            class="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span class="sr-only">{id}</span>
            <div class={`${icon}  text-3xl`} />
      </a>
      </>
    )
  }
  
  export default LinkedIcon