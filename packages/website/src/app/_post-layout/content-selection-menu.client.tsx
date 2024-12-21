'use client'

import { HTMLProps, useEffect, useRef, useState} from "react";
import {MessageCircleMore} from "lucide-react";
type SelectionMenuProps = {
  x: number,
  y: number,
  show: boolean,
}
export const ContentSelectionMenuClient = (
  {
  ...rest
  }: HTMLProps<HTMLDivElement>
)=> {

  const ref = useRef<HTMLDivElement>(null)
  const [{ x, y, show }, setSelectionProps] = useState<SelectionMenuProps>({
    x: 0,
    y: 0,
    show: false
  })
  const [selectionText, setSelectionText] = useState<string>('')
  useEffect(() => {
    if(!ref.current) {
      return
    }
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
        const rects = selection.getRangeAt(0).getClientRects();
        const n = rects.length - 1;
        const x = rects[n].x + rects[n].width + window.scrollX
        const y = rects[n].y + window.scrollY
        setSelectionText(selection.toString())
        setSelectionProps({x:x, y:y, show: true })
      } else {
        setSelectionText('')
        setSelectionProps({
          x: 0,
          y: 0,
          show: false,
        });
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handlerComment = () => {
  //   todo popup comment area
  }
  return (
    <div {...rest} ref={ref}>

      {
        show ? <div className={'absolute px-2 py-0.5 rounded-full bg-card text-card-foreground border border-border'}
                    onMouseUpCapture={(e)=> {
                      e.preventDefault()
                      handlerComment()
                    }}
                    style={{
                      left: x,
                      top: y,
                    }}>
          <MessageCircleMore />
        </div> : null
      }
    </div>
  )
}
