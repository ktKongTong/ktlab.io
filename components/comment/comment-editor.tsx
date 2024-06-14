'use client'
import {useComments} from "@/hooks/useComments";
import {useCallback, useState} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {RawMarkdownRender} from "@/components/markdown/xlog/render";
import {motion} from "framer-motion";

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
    await addComment({comment:data, parentId})
    setInput("")
    setDisabled(false)
  },[parentId, addComment])

  const [show, setShow] = useState(false)

  const [mode, setMode] = useState<'edit'|'preview'>('edit')
  return (
    <>
      <div className={'flex flex-col space-y-2'}>
        <div className={'flex flex-row space-x-2'}>
          <Button variant={'link'}  className={mode == 'edit' ? 'text-muted-foreground':''} onClick={() => {
            setMode('edit')
          }}>edit</Button>
          <Button variant={'link'} className={mode == 'edit' ? '':'text-muted-foreground'} onClick={() => {
            setMode('preview')
          }}>preview</Button>
        </div>
        <motion.div className={'max-h-80 overflow-y-scroll min-h-40'}>
          {mode === 'preview' && <div className={'p-2 border rounded-lg h-full grow min-h-40 overflow-y-scroll border-secondary'}><RawMarkdownRender content={input}/></div>}
          {
            mode === 'edit' && <Textarea
                  className={`w-full h-full rounded-lg min-h-40`}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write your comment here."
                  value={input}
                  disabled={disabled}
              />
          }
        </motion.div>

        <div className={'justify-self-end self-end items-end space-x-2'}>
          <Button variant={'link'} onClick={() => setInput("")}>clear</Button>
          <Button variant={'link'} onClick={() => handleDataSubmit(input)}>Submit</Button>
        </div>

      </div>
    </>
  )
}