'use client'
import React from "react";
import {useContentInteractionData} from "@/hooks/query/use-interaction-data";
import { HTMLMotionProps } from "motion/react";
import { ReactionWithProps } from "@/app/_post-layout/reaction.client";

export default function Reactions(
  {
    contentId,
    ...rest
  }:{
    contentId: string
  } & Omit<HTMLMotionProps<"ul">, "ref">
) {
  const {reactions, addReaction:_addReaction} = useContentInteractionData(contentId)
  return <ReactionWithProps reactions={reactions} addReaction={_addReaction} {...rest}/>
}
