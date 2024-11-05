import PostLayout from "@/app/_post-layout";
import { getBlogPostById } from "@/queries/blog";
import {Metadata} from "next";
import {getAllDocumentWithoutFolder} from "@/lib/db";
import {unstable_cache} from "next/cache";
import NotFound from "@/app/not-found";

const metadata: Metadata = {
  title: 'ktlab | Blog',
  description: 'Blog Page',
};

export const revalidate = false;

const getPosts = unstable_cache(getBlogPostById,['blogs'], { revalidate: false})

export async function generateStaticParams() {
  const blogs = await getAllDocumentWithoutFolder()
  const ids = blogs.map(it => ({id:it.id.split('\/')}))
  return ids
}

export async function generateMetadata(
  { params }: {
    params: { id: string[]  }
  },
): Promise<Metadata> {

  let path = params.id ?? []
  const blog =  await getBlogPostById(path.join('/'));
  if(blog?.title) {
    return {
      title: "ktlab | " + blog.title,
      description: blog.excerpt,
    }
  }
  return metadata
}

export default async function BlogPage({
  params
}: {
  params: { id: string[] }
}) {
  const blog =  await getPosts(params.id.join('/'));
  if (!blog) {
    return <NotFound />
  }
  return (
    <PostLayout {...blog} withCommentArea={true}/>
  )
}