'use client'
import {useEffect, useRef} from "react";

export default function SkillTree() {

  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(()=> {
    if(!canvas.current) {
      return
    }
    const ctx = canvas.current.getContext('2d')

  })

  return (
    <canvas ref={canvas} width={800} height={800} />
  )
}