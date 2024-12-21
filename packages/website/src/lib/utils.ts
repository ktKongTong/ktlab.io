import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import relative from 'dayjs/plugin/relativeTime'
import zh from 'dayjs/locale/zh-cn'
import {nanoid} from "nanoid";

import utc from 'dayjs/plugin/utc'
dayjs.locale(zh)
dayjs.extend(utc)
dayjs.extend(relative)
export const isServerSide = () => typeof window === "undefined"
export const isProd = () => process.env.NODE_ENV === "production"

export const relativeTime = (t: string | Date | number) => {
  return dayjs.utc(t)
    .fromNow()
}

export const dayDiff = (t: string| Date) => {
  return dayjs.utc(t)
    .diff(dayjs.utc(), 'day')
}

export const formatTime = (t: string| Date, format: string = 'YYYY-MM-DD') => {
  return dayjs.utc(t)
    .format(format)
}
export const formatRelativeTime = (time: string | Date | number) => {
  let  t = time
  if(typeof time === 'number') {
    if (time.toString().length === 10) {
      t = time * 1000
    }
  }
  if(typeof time === 'string') {
    if (time.length === 10) {
      t = time + '000'
    }
  }
  return dayjs.utc().to(dayjs.utc(t))
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