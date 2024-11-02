'use client'


import { CommentWithDocumentVO } from "@/interfaces/vo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {formatTime, relativeTime, truncate} from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Link from "@/components/link";

export default function RecentComments(
{
  comments
}:{
  comments: CommentWithDocumentVO[];
}) {
  return  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">User</TableHead>
        <TableHead>Document</TableHead>
        <TableHead className="text-left">内容</TableHead>
        <TableHead className={'w-[100px]'}>时间</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {comments.map((comment) => (
        <TableRow key={comment.id}>
          <TableCell className="font-medium p-2">
            <div className={'flex items-center space-x-2'}>
              <Avatar className={'w-6 h-6 rounded-full '}>
                <AvatarImage src={comment.userInfo.imageUrl}/>
                <AvatarFallback >{comment.userInfo.name}</AvatarFallback>
              </Avatar>
              <Label>{comment.userInfo.name}</Label>
            </div>
          </TableCell>
          <TableCell className={'p-2'}>
            <Link href={`/blog/${comment.documentInfo.id}`} className={'pb-0.5 border-b border-dashed hover:border-b-primary'}>{truncate(comment.documentInfo.title, 14)}</Link>
          </TableCell>
          <TableCell className={'p-2 '}>{truncate(comment.body.text, 10)}</TableCell>
          <TableCell className="text-left break-keep w-[100px] p-0">{formatTime(comment.createdAt?.toString() ?? '')}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
}