import { Hono } from 'hono'
import type {KVNamespace, R2Bucket} from '@cloudflare/workers-types'

type Bindings = {
  WEBSITE_TOKEN: string
  LINEAR_API_KEY: string
  LINEAR_PROJECT_ID: string
  KV: KVNamespace
  R2: R2Bucket
}

const app = new Hono<{ Bindings: Bindings }>()

const attachmentRegex = /!\[(.+)]\((https:\/\/uploads\.linear\.app\/[^\s]+)\s?.*\)/g
app.post('/linear/event', async (c) => {
  const event = await c.req.json()
  const linearKey = c.env.LINEAR_API_KEY
  const uploadToR2 = async (source: string)=> {
    try {
      const file = await fetch(source, {
        headers: {
          Authorization: linearKey,
        }
      })
      const buf = await file.arrayBuffer()
      const res = await c.env.R2.put(`linear/${btoa(source)}`, buf)
      console.log("upload result", res)
      return `https://r2-lab.ktlab.io/${res!.key}`
    }catch (e) {
      console.log("upload failed", e)
    }
  }


  if(event.type == 'Issue' && (event.action === 'update')) {
    const content = event.data.description as string
    const isTargetProject = event.data.project.id === c.env.LINEAR_PROJECT_ID
    const isFinished = event.data.state.name === 'Done'
    if (isTargetProject && isFinished && content) {
      // handle attachment
      const matched = content.matchAll(attachmentRegex)
      let a = matched.next()
      let replaceItems = []
      while(!a.done) {
        const [full, name, url] = a.value
        const uploadedUrl = await uploadToR2(url) ?? url
        const result = full.replace(url, uploadedUrl)
        replaceItems.push({
          source: full,
          target: result,
        })
        a = matched.next()
      }

      console.log("replaceItems", replaceItems)
      let finalContent = content
      replaceItems.forEach(item => {
        finalContent = finalContent.replace(item.source, item.target)
      })
      console.log("replacedContent", finalContent)
      const res = await fetch('https://ktlab.io/api/fragment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.WEBSITE_TOKEN}`,
        },
        body: JSON.stringify({
          content: finalContent
        })
      })
      console.log(await res.json())
    }
  }
  return c.json({})
})



export default {
  fetch: app.fetch,
}