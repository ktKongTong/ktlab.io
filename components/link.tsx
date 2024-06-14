import NextLink, {LinkProps as NextLinkProps} from "next/link";
import React from "react";
export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & NextLinkProps & {
  children?: React.ReactNode;
} & React.RefAttributes<HTMLAnchorElement>

export default function Link({
  children,
  ...rest
}:LinkProps) {
  return (
    <NextLink {...rest}>{children}</NextLink>
  )
}