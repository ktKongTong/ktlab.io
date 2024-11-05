import {MiddlewareHandler} from "hono";
import {getAuth} from "@hono/clerk-auth";

export const customClerkMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const auth = getAuth(c)
    if (auth?.userId) {
      c.set('userId', auth.userId);
      const clerkClient = c.get('clerk')
      let user=  await  clerkClient.users.getUser(auth.userId)

      const email = user?.emailAddresses[0].emailAddress!
      const possibleUname = email.replace(/@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '');
      let userInfo = {
        userid: user.id,
        imageUrl: user?.imageUrl!,
        email: email,
        name: (user?.username ?? ((user?.lastName == user.firstName) ? user.lastName : `${user.firstName}${user.lastName}`)) ?? possibleUname,
      }
      c.set('userId',auth.userId)
      c.set('userInfo', userInfo)
    }
    await next();
  }
}