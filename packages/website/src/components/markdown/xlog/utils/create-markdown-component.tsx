import type { ExtraProps } from "hast-util-to-jsx-runtime"
import React, {
  type ClassAttributes,
  type FC,
  type HTMLAttributes,
} from "react"

export const createMarkdownHeaderComponent = (tag: React.ElementType) => {
  const MarkdownHeader: FC<
    ClassAttributes<HTMLHeadingElement> &
    HTMLAttributes<HTMLHeadingElement> &
    ExtraProps
  > = ({ children, ...rest }) => {
    const Tag = tag

    return (
      <Tag {...rest}>
        {children}
        <a
          className="md-anchor"
          tabIndex={-1}
          href={rest.id ? `#${rest.id}` : undefined}
        >
          #
        </a>
      </Tag>
    )
  }

  return MarkdownHeader
}