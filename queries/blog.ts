import {Constants} from "@/lib/constants";
import {Article} from "@/interfaces/article";

export async function getBlogPosts(): Promise<any> {
  return fetch(`${Constants().BASE_URL}/api/blog`, {
    cache: "no-cache",
  }).then((res) => res.json()).then((data: any) => data.data);
}

export async function getBlogPostById(id: string): Promise<Article> {
  return fetch(`${Constants().BASE_URL}/api/blog/${id}`, {}).then(res => res.json()).then((data: any) => data.data);
}


export async function getBlogPostsByCategory(categoryId: string): Promise<any> {
  return fetch(`${Constants().BASE_URL}/api/blog?topic=${categoryId}`, {
    cache: "no-cache",}).then((res) => res.json()).then((data: any) => data.data);
}