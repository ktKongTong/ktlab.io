import RSS from 'rss'

import { seo } from '@/config/seo'
import {getBlogPostMetas} from "@/queries/blog";
import {Constants} from "@/lib/constants";
import {unstable_cache} from "next/cache";

const getBlogs = unstable_cache(getBlogPostMetas, ['blogs'], {
  revalidate: 3600,
  tags: ['blogs']
})

export const revalidate = 60 * 60


export async function GET() {
  let href = Constants().BASE_URL
  if (!href.endsWith("/")) {
    href += '/'
  }
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    site_url: href,
    feed_url: `${href}feed.xml`,
    language: 'zh-CN',
    image_url: `${href}avatar-no-bg.png`,
    generator: 'RSS',
  })

  const data = await getBlogs()
  if (!data) {
    return new Response('Not found', { status: 404 })
  }

  data.forEach((post) => {
    feed.item({
      title: post.title,
      guid: post.id,
      url: `${href}${post.slug}`,
      description: post.excerpt ?? '',
      date: new Date(post.createdAt),
    })
  })

  return new Response(feed.xml(), {
    headers: {
      'content-type': 'application/xml',
    },
  })
}