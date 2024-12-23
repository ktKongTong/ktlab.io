'use client'
import {useComment, useCommentEditor,} from "./hooks/use-comments";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Markdown} from "@/components/markdown";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function CommentEditor(
{
  documentId,
  parentId
}:{
  documentId:string,
  parentId?:string
}
) {
  const { editingComment, setEditingComment, } = useCommentEditor(documentId)
  const {sendComment, isLoading} = useComment(documentId)
  const disabled = isLoading
  const setComment = (v: string) => {
    setEditingComment(v)
  }

  const handleDataSubmit = () => {
    sendComment({
      commentContent: editingComment,
      parentId: parentId
    })
  }
  return (
    <>
      <div className={'flex flex-col space-y-2'}>
        <Tabs defaultValue={'edit'} className={' className="w-full overflow-y-hidden"'}>
          <TabsList className="flex items-center justify-start w-auto gap-1 bg-transparent p-0 mt-0">
            <TabsTrigger value={'edit'} className={'data-[state=active]:bg-transparent bg-transparent px-1'}>Edit</TabsTrigger>
            <TabsTrigger value={'preview'} className={'data-[state=active]:bg-transparent bg-transparent px-1'}>Preview</TabsTrigger>
          </TabsList>
          <TabsContent value={'edit'}>
            <Textarea
              className={`w-full h-full rounded-lg max-h-60 min-h-16 resize-none border-dashed border-border`}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here."
              value={editingComment}
              disabled={disabled}
            />

          </TabsContent>
          <TabsContent value={'preview'}>
            <div className={'p-2 border border-dashed border-border rounded-lg grow overflow-y-scroll max-h-60 min-h-16'}>
              <Markdown content={editingComment}/>
            </div>
          </TabsContent>
        </Tabs>
        <div className={'justify-self-end self-end items-end space-x-2'}>
          <Button variant={'ghost'} onClick={() => setEditingComment("")}>clear</Button>
          <Button variant={'ghost'} onClick={() => handleDataSubmit()}>Submit</Button>
        </div>

      </div>
    </>
  )
}