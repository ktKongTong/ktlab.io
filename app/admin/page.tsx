import {Label} from "@/components/ui/label";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {getDocumentStats,getCommentStatistic} from "@/lib/db/statistic";
import {FileText, MessageCircleMore, PencilLine, ReplyIcon} from "lucide-react";
import RecentComments from "@/app/admin/recent-comments";
import {getRecentComments, getRecentDocuments} from "@/lib/db/comment";
import Link from "@/components/link";
import {CommentWithDocumentDto} from "@/interfaces/dbo";
import RecentDocuments from "@/app/admin/recent-documents";


export default async function AdminPage() {
  // dashboard
  // show comment count
  const [commentStats, recentComments, contentStats, recentContents ] = await Promise.all([
    getCommentStatistic(),
    getRecentComments(),
    getDocumentStats(),
    getRecentDocuments(),
  ])
  // kv
  // recent comment
  // latest article
  // event
  // last visitor
  // ips
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1"/>
        <Separator orientation="vertical" className="mr-2 h-4"/>
        <Label>Dashboard</Label>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className={'rounded-xl bg-secondary p-4 flex flex-col'}>
            <div className={'w-full flex items-center justify-between'}>
              <Label className={'text-lg '}>Comments</Label>
              <MessageCircleMore className={'w-4 h-4 text-muted-foreground'}/>
            </div>
            <Label className={'text-3xl font-bold self-end'}>+{commentStats.this_week_count}</Label>
            <Label className={'text-secondary-foreground text-sm  self-end'}>comments since this week</Label>
          </div>
          <div className={'rounded-xl bg-secondary p-4 flex flex-col'}>
            <div className={'w-full flex items-center justify-between'}>
              <Label className={'text-lg '}>Outputs</Label>
              <FileText className={'w-4 h-4 text-muted-foreground'}/>
            </div>
            <Label className={'text-3xl font-bold self-end'}>+{contentStats.this_month_document_count}</Label>
            <Label className={'text-secondary-foreground text-sm  self-end'}>this week</Label>
          </div>
          <div className={'rounded-xl bg-secondary p-4 flex flex-col'}>
            <div className={'w-full flex items-center justify-between'}>
              <Label className={'text-lg '}>累计输出</Label>
              <PencilLine className={'w-4 h-4 text-muted-foreground'}/>
            </div>
            <Label className={'text-3xl font-bold self-end'}>+{contentStats.wordcount_this_month}字</Label>
            <Label className={'text-secondary-foreground text-sm  self-end'}>since this month</Label>
          </div>
        </div>
        <div>
          <div className={'w-full flex justify-between items-center'}><Label className={'text-center'}>Recent Comments</Label> <Link href={'/admin/comment'}><Label
            className={'pb-0.5 border-b border-dashed hover:border-b-primary cursor-pointer'}>{`>`} all comments</Label></Link></div>
          <RecentComments comments={recentComments}/>
        </div>
        <div>
          <div className={'w-full flex justify-between items-center'}><Label>Recent Contents</Label> <Link href={'/admin/document'}>
            <Label className={'pb-0.5 border-b border-dashed hover:border-b-primary cursor-pointer'}>{`>`} all contents</Label></Link></div>
          <RecentDocuments documents={recentContents}/>
        </div>
      </div>
    </>
  )
}