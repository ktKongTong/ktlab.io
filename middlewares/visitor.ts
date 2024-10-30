import {MiddlewareFactory} from "@/middlewares/factory";
import { NextFetchEvent, NextRequest } from "next/server";
import kv, {kvKey} from "@/lib/kv";

export const withVisitor: MiddlewareFactory = (next) => {
  return async(request: NextRequest, _next: NextFetchEvent) => {
    await kv.incr(kvKey.siteView)
    await kv.set(kvKey.siteLastVisitor, {
      city: request.geo?.city,
      country: request.geo?.country,
      region: request.geo?.region
    })
    return next(request, _next);
  };
};