import {Hono} from "hono";

import {z, ZodIssueCode} from 'zod'
import {getDB, getEmail} from "@/app/api/[[...route]]/_middleware";
import {pathPrefix} from "@/config";
import { EmailTemplate } from "@/app/api/[[...route]]/_email";
import DB from "@/lib/db/db";
import {commentBodySchema, CommentDBO, CommentDBOSchema, ContentDBO, DocumentDBO} from "@repo/shared";
import {Constants} from "@/lib/constants";
import {Resend} from "resend";
import {logger} from "@/lib/logger";
const parseJsonPreprocessor = (value: any, ctx: z.RefinementCtx) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: (e as Error).message,
      });
    }
  }
  return value;
};
const app = new Hono()

const commentMQMessageSchema = z.preprocess(parseJsonPreprocessor,
  CommentDBOSchema.omit({createdAt: true}).extend({
    createdAt: z.coerce.date()
  }))

app.post('/api/queue/new-comment', async (c)=> {

//   1. send email
//   2. send to bot, webhook
  const signature = c.req.header('Upstash-Signature')!;
  const body = await c.req.text();
  const receiver = c.get('receiver')
  const isValid = await receiver
    .verify({
      signature: signature,
      body,
    }).catch(e => {
      logger.error("failed to verify", e)
    })
  if(!isValid) {
    return c.json({}, 400)
  }
  const comment = commentMQMessageSchema.safeParse(body)
  if(!comment.success) {
    return c.json({}, 400)
  }
  // comment.data.id
  try {
    await commentNotifyQueue(getEmail(c), getDB(c), comment.data)
  }catch (e) {
    logger.error(e)
  }
  return c.json({})
})


const commentNotifyQueue = async (resend: Resend, db: ReturnType<typeof DB>, comment: CommentDBO) => {
  const name = comment.userInfo.name
  const documentId = comment.documentId
  const mayDocument = await db.getContentOrDocumentById(documentId)

  const receiver = []
  if(comment.parentId) {
    const replyTo = await db.getCommentByCommentId(comment.parentId)
    if(replyTo) {
      receiver.push(replyTo.userInfo.email)
    }
  }
  if(mayDocument) {
    let mayTitle = (mayDocument as ContentDBO).content
    if(mayTitle && mayTitle.length > 20) mayTitle = mayTitle.slice(0,20) + "..."
    let title = `碎片:(${mayTitle})`
    let url = `${Constants().BASE_URL}/fragment/${mayDocument.id}`
    if((mayDocument as DocumentDBO).title) {
      let doc = mayDocument as DocumentDBO
      title = doc.title
      let p = doc.relativePath
      if(p?.startsWith(pathPrefix.knowledgebases.basePath)) {
        p = p?.replace(pathPrefix.knowledgebases.basePath, '') ?? p
        url = `${Constants().BASE_URL}/knowledge/${p}`
      }else {
        url = `${Constants().BASE_URL}/blog/${mayDocument.id}`
      }
    }
    const siteOwnerEmail = process.env.SITE_OWNER_EMAIL!
    const siteSender = process.env.SITE_OWNER_EMAIL!
    const {data, error}= await resend.emails.send({
      from: siteSender,
      to: [siteOwnerEmail, ...receiver],
      subject: 'Comment',
      react: await EmailTemplate({ name: name, url: url, content: comment.body.text, title: title }),
    })
    if(error) {
      logger.error(error.name, error.message)
    }
  }
}


export { app as commentQueueHandlerRoute }

