import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import relative from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'
dayjs.extend(relative)
dayjs.locale(zh)
export const isServerSide = () => typeof window === "undefined"

export const formatTime = (t: string) => {
  return dayjs(t)
    .fromNow()
}

export const formatRelativeTime = (time: any) => {
  return dayjs().to(dayjs(time))
}