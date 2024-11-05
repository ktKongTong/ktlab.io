import {usePathname} from "next/navigation";
import {useMemo} from "react";

export const useMatchPath = (match: string) => {
  const p = usePathname()
  const pathname = decodeURIComponent(p)
  const current = useMemo(()=> pathname === match || pathname +"/index.md" === match || pathname +"/index" === match, [pathname, match])
  return current
}