import type {Context, MiddlewareHandler} from "hono";

export const getGEO = (c:Context)=> {
  return c.get('geo');
}
interface GEO {
  country: string;
  city: string;
  region: string;
}
declare module 'hono' {
  interface ContextVariableMap {
    geo: GEO
  }
}
export const GEOMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    c.set('geo', {
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
    })
    await next()
  }
}
