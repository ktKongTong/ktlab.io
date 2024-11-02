
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "@/components/link";
import {formatTime, truncate} from "@/lib/utils";
import {TagIcon} from "lucide-react";
import {DocumentVO} from "@/interfaces/vo";

export default function RecentDocuments(
  {
    documents
  }:{
    documents: DocumentVO[];
  }) {
  return  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead className="text-left">Tags</TableHead>
        <TableHead className={'w-[100px]'}>时间</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {documents.map((document) => (
        <TableRow key={document.id}>
          <TableCell className={' p-2'}>
            <Link href={`/blog/${document.id}`} className={'pb-0.5 border-b border-dashed hover:border-b-primary'}>{truncate(document.title, 14)}</Link>
          </TableCell>
          <TableCell className="text-left break-keep p-2">
            <div className={'inline-flex items-center gap-1 flex-wrap'}>
              <TagIcon className={'w-4 h-4'}/>
              {
                document.tags.map(tag=> <Link key={tag} href={`/tag/${tag}`}><span className={'animate-underline'}>{tag}</span></Link>)
              }
            </div>
          </TableCell>
          <TableCell className={'p-2 '}>{formatTime(document.createdAt?.toString() ?? '')}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}