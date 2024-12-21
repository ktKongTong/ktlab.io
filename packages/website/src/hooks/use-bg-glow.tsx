import {motion, useMotionTemplate, useMotionValue} from "motion/react";
import React from "react";

export const useBgGlow = () => {

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)
  const handleMouseMove = React.useCallback(
    ({clientX, clientY, currentTarget}: React.MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - bounds.left)
      mouseY.set(clientY - bounds.top)
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
    },
    [mouseX, mouseY, radius]
  )
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) /.3) 0%, transparent 65%)`


  const MouseTrackGlow = () => <motion.div
    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    style={{background}}
    aria-hidden="true"
  />



  return {
    handleMouseMove,
    MouseTrackGlow: MouseTrackGlow
  }


}