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
  const isExternal = typeof href === 'string' && !href.startsWith('/');

  return (
    <NextLink target="_blank" href={href} {...rest}>
      {isExternal && withFavicon && (
        <Image
          src={`https://favicon.yandex.net/favicon/${new URL(href).hostname}`}
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