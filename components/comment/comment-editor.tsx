'use client'
import {useComments} from "@/hooks/query/use-comments";
import {useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
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
  const {addComment, comments, updateDocumentId} = useComments()
  const [input, setInput] = useState("");
  updateDocumentId(documentId)
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleDataSubmit = useCallback(async (data: string)=> {
    setDisabled(true)
    addComment({comment: data, parentId})
    setInput("")
    setDisabled(false)
  },[parentId, addComment])
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
              className={`w-full h-full rounded-lg min-h-60 resize-none border-dashed`}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your comment here."
              value={input}
              disabled={disabled}
            />

          </TabsContent>
          <TabsContent value={'preview'}>
            <div className={'p-2 border border-dashed rounded-lg grow overflow-y-scroll h-60'}>
              <RawMarkdownRender content={input}/></div>
          </TabsContent>
        </Tabs>
        <div className={'justify-self-end self-end items-end space-x-2'}>
          <Button variant={'ghost'} onClick={() => setInput("")}>clear</Button>
          <Button variant={'ghost'} onClick={() => handleDataSubmit(input)}>Submit</Button>
        </div>

      </div>
    </>
  )
}