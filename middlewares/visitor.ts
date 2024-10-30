import {MiddlewareFactory} from "@/middlewares/factory";
import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import kv from "@/lib/kv";
import {kvKey} from "@/app/api/[[...route]]/_utils";

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