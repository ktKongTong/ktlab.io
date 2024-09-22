import {Constants} from "@/lib/constants";

export async function getRecentActivity(): Promise<any> {
  const res = await fetch(`${Constants().BASE_URL}/api/activities/recent`, {}).then((res) => res.json()).then((data: any) => data.data);
  // const activities = res.filter((item: any) => item.type != 'blog');
  // const blogActivities = res.filter((item: any) => item.type == 'blog');
  return {
    activities: res,
    blogActivities:[],
  }

}