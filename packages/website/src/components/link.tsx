import NextLink, {LinkProps as NextLinkProps} from "next/link";
import React from "react";
import Image from "next/image";
export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & NextLinkProps & {
  children?: React.ReactNode;
  withFavicon?: boolean;
} & React.RefAttributes<HTMLAnchorElement>

export default function Link({
  children,
  withFavicon = true,
  href,
  ...rest
}: LinkProps) {
  const isExternal = href && typeof href === 'string' && !href.startsWith('/');
  let iconLink: string = ''
  if(isExternal && href) {
    iconLink = `https://favicon.yandex.net/favicon/${new URL(href).hostname}`
  }
  return (
    <NextLink target={isExternal ? '_blank': '_self'} href={href} {...rest}>
      {isExternal && withFavicon && (
        <Image
          src={iconLink}
          alt="Favicon"
          className="inline-block mr-1 w-4 h-4 rounded-full"
          width={16}
          height={16}
        />
      )}
      {children}
    </NextLink>
  )
}