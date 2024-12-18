import {isProd} from "@/lib/utils";
import kv, {kvKey} from "@/lib/kv";
import {MousePointerClick, UsersIcon} from "lucide-react";

export async function SiteViewCount() {
  let views: number
  if (isProd()) {
    views = await kv.incr(kvKey.siteView)
  } else {
    views = 0
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat('en-US').format(views)}次浏览`}>
        总浏览量&nbsp;
        <span className="font-medium">{Intl.NumberFormat('en-US').format(views)}</span>
      </span>
    </span>
  )
}
// city,country, region, ip
type Visitor = {
  city: string,
  country: string,
  region: string,
  ip: string
}
export async function LastVisitorInfo() {
  let lastVisitor: Visitor | undefined = undefined
  if (isProd()) {
    const [lv, cv] = await kv.mget<[Visitor, Visitor]>(kvKey.siteLastVisitor, kvKey.siteLastVisitor)
    lastVisitor = lv
    await kv.set(kvKey.siteLastVisitor, cv)
  }
  if (!lastVisitor) {
    lastVisitor = {
      city:'HongKong',
      country: 'CN',
      region: 'Asia',
      ip:'127.0.0.1'
    }
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <MousePointerClick className="h-4 w-4" />
      <span>
        最近访客来自{" "}{[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
      {/*<span className="font-medium">{lastVisitor.ip}</span>*/}
    </span>
  )
}


