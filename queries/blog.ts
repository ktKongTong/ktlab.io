import {Constants} from "@/lib/constants";

export async function getBlogPosts(): Promise<any> {
  return fetch(`${Constants().BASE_URL}/api/blog`, {}).then((res) => res.json()).then((data: any) => data.data);
}

export async function getBlogPostById(id: string): Promise<any> {
  return fetch(`${Constants().BASE_URL}/api/blog/${id}`, {}).then(res => res.json()).then((data: any) => data.data);
}


export async function getBlogPostsByCategory(categoryId: string): Promise<any> {
  return fetch(`${Constants().BASE_URL}/api/blog?topic=${categoryId}`, {}).then((res) => res.json()).then((data: any) => data.data);
}