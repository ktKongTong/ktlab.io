import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import relative from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'
import {nanoid} from "nanoid";
dayjs.extend(relative)
dayjs.locale(zh)

export const isServerSide = () => typeof window === "undefined"
export const isProd = () => process.env.NODE_ENV === "production"
export const relativeTime = (t: string | Date) => {
  return dayjs(t)
    .fromNow()
}
export const dayDiff = (t: string| Date) => {
  return dayjs(t)
    .diff(dayjs(), 'day')
}

export const formatTime = (t: string| Date, format: string = 'YYYY-MM-DD') => {
  return dayjs(t)
    .format(format)
}
export const formatRelativeTime = (time: string | Date | number) => {
  return dayjs().to(dayjs(time))
}

export const truncate = (str: string, length: number = 20) => {
  if (str.length <= length) {
    return str
  }
  return str.slice(0, length) + "..."
}

export function uniqueId() {
  return nanoid(10)
}