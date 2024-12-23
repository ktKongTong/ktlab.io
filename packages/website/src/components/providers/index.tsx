import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "next-themes";
import {ReactQueryProvider} from "@/components/providers/tanstack";
import {CodeThemeProvider} from "@/components/markdown/xlog/components/shiki/theme-ctx";
export default function Providers({
  children
}:{
  children: React.ReactNode,
}) {
  return <>
    <ReactQueryProvider>
    <ThemeProvider attribute={'data-mode'}>
      <ClerkProvider>
      <CodeThemeProvider>
        {children}
      </CodeThemeProvider>
      </ClerkProvider>

    </ThemeProvider>
    </ReactQueryProvider>
    </>
}