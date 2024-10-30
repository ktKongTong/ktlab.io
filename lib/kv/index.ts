import {Redis} from "@upstash/redis";
import {isProd} from "@/lib/utils";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const wrapEnv = (key: string) => isProd() ? `${key}:prod` : `${key}:dev`

export const kvKey = {
  postMeta: (id:string)=> wrapEnv(`ktlab.io:document:meta:${id}`),
  postReaction: (id:string)=> wrapEnv(`ktlab.io:document:reaction:${id}`),
  postView: (id:string)=> wrapEnv(`ktlab.io:document:view:${id}`),
  postLastVisitor: (id:string)=> wrapEnv(`ktlab.io:document:last-visitor:${id}`),
  siteLastVisitor: wrapEnv(`ktlab.io:last-visitor`),
  siteView: wrapEnv(`ktlab.io:view`),
}

export default redis;
