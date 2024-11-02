import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {FileText, MessageCircleMore, PencilLine} from "lucide-react";
import {getCommentStatistic} from "@/lib/db/statistic";
import CommentsTable from "@/app/admin/comment/comments-table";
import { CommentWithDocumentVO } from "@/interfaces/vo";
import {getRecentComments} from "@/lib/db/comment";

//

const DashboardCardItem = (
  {
    label,
    icon,
    data,
    dataDescription
  }:{
    label:string,
    icon: React.ReactNode,
    data: string,
    dataDescription: string,
  }
)=> {
  return (
    <div className={'rounded-xl bg-secondary p-4 flex flex-col'}>
      <div className={'w-full flex items-center justify-between'}>
        <Label className={'text-lg '}>{label}</Label>
        {icon}
      </div>
      <Label className={'text-3xl font-bold self-end'}>{data}</Label>
      <Label className={'text-secondary-foreground text-sm  self-end'}>{dataDescription}</Label>
    </div>
  )
}


export default async function AdminCommentPage() {
  const res = await getCommentStatistic()
  const comments = await getRecentComments()
  return <>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1"/>
      <Separator orientation="vertical" className="mr-2 h-4"/>
      <Label>Comments</Label>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardCardItem
          label={"Comments"}
          icon={<MessageCircleMore className={'w-4 h-4 text-muted-foreground'}/>}
          data={`+${res.today_count}`}
          dataDescription={'today'}
        />
        <DashboardCardItem
          label={"Comments"}
          icon={<MessageCircleMore className={'w-4 h-4 text-muted-foreground'}/>}
          data={`+${res.this_week_count}`}
          dataDescription={'comments since this week'}
        />
        <DashboardCardItem
          label={"Comments"}
          icon={<MessageCircleMore className={'w-4 h-4 text-muted-foreground'}/>}
          data={`+${res.this_month_count}`}
          dataDescription={'comments since this month'}
        />
      </div>
      <CommentsTable initialComments={comments}/>
    </div>
  </>
}