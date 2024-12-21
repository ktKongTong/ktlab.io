import {renderPageContent} from "@/components/markdown/xlog/index";
import {cn} from "@/lib/utils";
export type PolymorphicComponentProps<T extends React.ElementType> = {
  as?: T;
} & React.ComponentPropsWithoutRef<T>

export const RawMarkdownRender = <T extends React.ElementType = 'div'>(
{
  as,
  children,
  content,
  className,
  ...props
}: PolymorphicComponentProps<T> & {content: string}
) => {
    const Component = as || 'div'
  const inParsedContent = renderPageContent({content})
  return <Component {...props} className={cn("md-content prose",className)}>{inParsedContent?.toElement()}</Component>;
};