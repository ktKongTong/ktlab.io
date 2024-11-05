import {MiddlewareFactory} from "@/middlewares/factory";
import { NextFetchEvent, NextRequest } from "next/server";
import kv, {kvKey} from "@/lib/kv";

export const withVisitor: MiddlewareFactory = (next) => {
  return async(request: NextRequest, _next: NextFetchEvent) => {
    const { geo, nextUrl, ip } = request
    const isApi = nextUrl.pathname.startsWith('/api/')
    if(!isApi && geo) {
      await kv.set(kvKey.siteLastVisitor, {
        city: geo.city,
        country: geo.country,
        region: geo.region,
        ip: ip
      })
    }
    return next(request, _next);
  };
};