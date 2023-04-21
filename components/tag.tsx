import { Link } from "./Link"

interface TagProps {
    text: string
    href: string
    className?: string
}
export const Tag = ({ text,href,className}:TagProps, {slot}) => {
    return(
        <Link
            href={href}
            className={`${className}  mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400`}>
            {text}
        </Link>
    )
}