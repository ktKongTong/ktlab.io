'use client'
import Link, {LinkProps} from "@/components/link";
import {useRouter} from "next/navigation";

export default function ClientNavLink(
{
  href = '',
  children,
  ...rest
}:LinkProps
) {
  const router = useRouter();
  return (
    <Link href={href} onClick={()=>router.back()} {...rest}>
      {children}
    </Link>
  )
}