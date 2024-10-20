import {usePathname} from "next/navigation";
import {useMemo} from "react";

export const useMatchPath = (match: string) => {
  const pathname = usePathname()
  const current = useMemo(()=> pathname === match || pathname +"/index.md" === match || pathname +"/index" === match, [pathname, match])
  return current
}