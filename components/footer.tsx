import LinkedIcon, { IconProps } from './icon'

interface Props {
    socialIcons: Array<IconProps>
    author: string
    title: string
}
export const Footer = ({socialIcons,author,title}:Props) => {
    return (
        <footer className="mb-2 flex flex-col items-center ">
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-3 flex space-x-4">
            {
                socialIcons.map((socialIcon:any) => {
                    return (
                        <LinkedIcon 
                            key={socialIcon.id}
                            id={socialIcon.id}
                            primarycolor={socialIcon.primarycolor}
                            source={socialIcon.source}
                            size={socialIcon.size}
                            href={socialIcon.href}
                        />
                    )
                })
            }
          </div>
          <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <a href="/">{title}</a>
          </div>
        </div>
      </footer>
    )
  }