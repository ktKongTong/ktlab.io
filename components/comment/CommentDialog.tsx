'use client'
import {ClientOnly} from "@/components/client-only";
import CommentEditor from "@/components/comment/comment-editor";
import Comments from "@/components/comment/comments";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useBreakpoint} from "@/app/(header)";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function CommentDialog (
  {
    documentId,
    children
  }:{
    documentId: string,
    children: React.ReactNode
  }
) {
  const { isLg } = useBreakpoint(`lg`)

  const [open, setOpen] = useState(false)
  if(isLg) {

  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>{children}</DialogTrigger>
          <DialogContent className={'w-full overflow-y-hidden'}>
            <div className={''}>
              <CommentEditor documentId={documentId}/>
              <Comments documentId={documentId} className={'w-full overflow-y-scroll max-h-[500px]'}/>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent  className={'w-full overflow-y-hidden'}>
        {/*<DrawerHeader className="text-left">*/}
          {/*<DialogTitle>Are you absolutely sure?</DialogTitle>*/}
        {/*</DrawerHeader>*/}
        <div>
          <CommentEditor documentId={documentId}/>
          <Comments documentId={documentId} className={'w-full overflow-y-scroll max-h-[500px]'}/>
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}