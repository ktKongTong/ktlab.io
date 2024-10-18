import type {Context, MiddlewareHandler} from "hono";
import type {ClerkOptions} from "@clerk/backend";
import {env} from "hono/adapter";
import { Redis } from "@upstash/redis"

declare module 'hono' {
  interface ContextVariableMap {
    kv: Redis
  }
}

type KVEnv = {
  UPSTASH_REDIS_REST_URL: string,
  UPSTASH_REDIS_REST_TOKEN: string,
}

interface KVOptions {
  provider: 'deno-kv' | 'cf-kv' | 'upstash' | 'vercel-kv'
}

export const getKV = (c:Context)=> {
  return c.get('kv')
}

export const KVMiddleware = (options?: ClerkOptions): MiddlewareHandler => {
  return async (c, next) => {
    const kvEnv = env<KVEnv>(c)
    const redis = new Redis({
      url: kvEnv.UPSTASH_REDIS_REST_URL,
      token: kvEnv.UPSTASH_REDIS_REST_TOKEN,
    })
    c.set('kv', redis)
    await next()
  }
}
