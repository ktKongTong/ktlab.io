import {Redis} from "@upstash/redis";
import {isProd} from "@/lib/utils";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const wrapEnv = (key: string) => isProd() ? `${key}:prod` : `${key}:dev`

export const kvKey = {
  postReaction: (id:string)=> wrapEnv(`ktlab.io:post:reaction:${id}`),
  postView: (id:string)=> wrapEnv(`ktlab.io:post:view:${id}`),
  postLastVisitor: (id:string)=> wrapEnv(`ktlab.io:post:last-visitor:${id}`),
  siteLastVisitor: wrapEnv(`ktlab.io:site:last-visitor`),
  siteCurrentVisitor: wrapEnv(`ktlab.io:site:current-visitor`),
  siteView: wrapEnv(`ktlab.io:site:view`),
}

export default redis;
