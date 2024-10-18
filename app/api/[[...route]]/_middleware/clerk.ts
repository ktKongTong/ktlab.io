import {MiddlewareHandler} from "hono";
import {getAuth} from "@hono/clerk-auth";


export const customClerkMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const auth = getAuth(c)
    if (auth?.userId) {
      c.set('userId', auth.userId);
      const clerkClient = c.get('clerk')
      let user=  await  clerkClient.users.getUser(auth.userId)
      let userInfo = {
        imageUrl: user?.imageUrl!,
        email: user?.emailAddresses[0].emailAddress!,
        name: user?.username ?? user?.lastName == user.firstName ? user.lastName : `${user.firstName}${user.lastName}`
      }
      c.set('userId',auth.userId)
      c.set('userInfo', userInfo)
    }
    await next();
  }
}