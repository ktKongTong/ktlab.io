import {Hono} from "hono";
import {env} from "hono/adapter";
import {HONO_ENV} from "@/app/api/[[...route]]/env";


const app = new Hono()
app.get('/api/route/:type/activity/recent', async (c)=> {
  const type = c.req.param('type')
  const { STATUS_HUB_TOKEN } = env<HONO_ENV>(c)
  const res = await fetch(`https://status-hub.ktlab.io/api/route/${type}/activity/recent`, {
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${STATUS_HUB_TOKEN}`
    }
  })
  const result = await res.json()
  return c.json(result)
})

export { app as activityRoute}

