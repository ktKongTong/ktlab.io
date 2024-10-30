import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {MessageCircleMore, PencilLine} from "lucide-react";
import { getRecentDocuments } from "@/lib/db/comment";
import { getDocumentStats } from "@/lib/db/statistic";
import ContentTable from "./content-table";
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
  const res = await getDocumentStats()
  const documents = await getRecentDocuments()
  return <>
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1"/>
      <Separator orientation="vertical" className="mr-2 h-4"/>
      <Label>Contents</Label>
    </header>
    <div className="flex flex-1 flex-col gap-4 p-4 max-w-3xl mx-auto">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <DashboardCardItem
          label={"Contents"}
          icon={<PencilLine className={'w-4 h-4 text-muted-foreground'}/>}
          data={`+${res.this_month_document_count}`}
          dataDescription={'本月输出'}
        />
        <DashboardCardItem
          label={"Contents"}
          icon={<PencilLine className={'w-4 h-4 text-muted-foreground'}/>}
          data={`${res.total_wordcount}字`}
          dataDescription={'累计输出(字)'}
        />
        <DashboardCardItem
          label={"Contents"}
          icon={<PencilLine className={'w-4 h-4 text-muted-foreground'}/>}
          data={`${res.document_count}篇`}
          dataDescription={'累计输出(篇)'}
        />
      </div>
      <ContentTable initialContents={documents}/>
    </div>
  </>
}