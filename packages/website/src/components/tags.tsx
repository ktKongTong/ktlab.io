import Link from "@/components/link";
import {cn} from "@/lib/utils";
import {HTMLProps} from "react";

const TagStyle = cn(
  `transition-all duration-300 hover:transition-all hover:duration-300`,
  `inline-flex items-center justify-center whitespace-nowrap rounded-md cursor-point px-1 text-sm font-medium  text-primary`,
  `underline  underline-offset-4 hover:underline hover:underline-offset-8`,
  `ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`,
  `disabled:pointer-events-none disabled:opacity-50 `
)

export default function Tag(
{
  className,
  children,
  ...rest
}:{
  href: string;
} & HTMLProps<HTMLAnchorElement>
) {
  return <Link
    {...rest}
    className={cn(TagStyle, className)}
  >
    {children}
  </Link>
}