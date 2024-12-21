'use client'
import {createContext, useContext, useState} from "react";

const ClientCommentIDContext = createContext<EditorProps>({
  draftId: '',
  renewDraftId: () => {}
})

type EditorProps = {
  draftId: string,
  renewDraftId: () => void
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 15)
}

export const ClientCommentIDProvider = (
  {children}: {children: React.ReactNode}
) => {

  const [state, setState] = useState(generateId())
  return <ClientCommentIDContext.Provider value={{
    draftId: state,
    renewDraftId: () => setState(generateId())
  }}>
    {children}
  </ClientCommentIDContext.Provider>
}

export const useClientCommentID = () => {
  const {draftId, renewDraftId} = useContext(ClientCommentIDContext)
  if(draftId === undefined) {
    throw new Error('useClientCommentID must be used within a ClientCommentIDProvider')
  }
  return {
    draftId,
    renewDraftId
  }
}