import {Resend} from "resend";

import type {Context, MiddlewareHandler} from "hono";
import {env} from "hono/adapter";
declare module 'hono' {
  interface ContextVariableMap {
    email: Resend
  }
}

type EmailEnv = {
  RESEND_TOKEN: string
}

export const getEmail = (c:Context) => {
  return c.get('email')
}

export const EmailMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const emailEnv = env<EmailEnv>(c)
    const email = new Resend(emailEnv.RESEND_TOKEN)
    c.set('email', email)
    await next()
  }
}

