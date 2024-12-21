import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "next-themes";
import {ReactQueryProvider} from "@/components/providers/tanstack";
export default function Providers({
  children
}:{
  children: React.ReactNode,
}) {
  return <>

    <ReactQueryProvider>
    <ThemeProvider attribute={'data-mode'}>
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </ThemeProvider>
    </ReactQueryProvider>
    </>
}