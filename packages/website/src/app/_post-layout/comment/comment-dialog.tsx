'use client'
import CommentEditor from "./comment-editor";
import Comments from "./comments";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useBreakpoint} from "@/hooks/use-breakpoint";

export default function CommentDialog(
  {
    documentId,
    children
  }:{
    documentId: string,
    children: React.ReactNode
  }
) {
  const { isLg } = useBreakpoint(`lg`)
  if(isLg) {
    return <DesktopCommentDialog contentId={documentId}>{children}</DesktopCommentDialog>
  }
  return <MobileCommentDrawer contentId={documentId}>{children}</MobileCommentDrawer>
}

function DesktopCommentDialog(
{
  contentId,
  children
}:{
  contentId: string,
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={'w-full overflow-y-hidden border-border'}>
        <DialogTitle>Comments</DialogTitle>
        <div className={''}>
          <CommentEditor documentId={contentId}/>
          <Comments contentId={contentId} className={'w-full overflow-y-scroll max-h-[500px]'}/>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MobileCommentDrawer(
{
  contentId,
  children
}:{
  contentId: string,
  children: React.ReactNode
}
) {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent  className={'w-full overflow-y-hidden border-border'}>
        <Comments contentId={contentId} className={'w-full overflow-y-scroll max-h-[calc(100vh-350px)] px-3'}/>
        <DrawerFooter className="pt-2">
          <CommentEditor documentId={contentId}/>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}