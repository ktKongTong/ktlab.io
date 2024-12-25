import type {Context, MiddlewareHandler} from "hono";
import {env} from "hono/adapter";
import {Client, Receiver} from "@upstash/qstash"
declare module 'hono' {
  interface ContextVariableMap {
    queue: Client
    receiver: Receiver
  }
}

type QueueEnv = {
  QSTASH_URL: string,
  QSTASH_TOKEN: string,
  QSTASH_CURRENT_SIGNING_KEY: string,
  QSTASH_NEXT_SIGNING_KEY: string,
}

interface QueueOptions {

}

export const getQueue = (c:Context) => {
  return c.get('queue')
}

export const QueueMiddleware = (options?: QueueOptions): MiddlewareHandler => {
  return async (c, next) => {
    const queueEnv = env<QueueEnv>(c)
    const queue = new Client({
      token: queueEnv.QSTASH_TOKEN,
    })
    c.set('queue', queue)
    const receiver = new Receiver({
      currentSigningKey: queueEnv.QSTASH_CURRENT_SIGNING_KEY,
      nextSigningKey: queueEnv.QSTASH_NEXT_SIGNING_KEY
    })
    c.set('receiver', receiver)
    await next()
  }
}
