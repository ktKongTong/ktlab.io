export type AvailableReactionType = 'like' | 'dislike' | 'wow' | 'shit' | string

export const reactionDict:Record<AvailableReactionType, React.ReactNode>= {
  'wow': '🤩',
  'fun': '🤣',
  'like':'👍',
  'dislike':'👎',
  'shit':'💩',
  'celebration':'🥳',
  'look':'👀',
  'joker':'🤡',
  'shocked':'🤯',
  'respect':'🫡'
}

const _defaultReaction = [
  'like','shit', 'wow','celebration'
]

export const defaultReaction:Record<AvailableReactionType, number> = _defaultReaction.reduce((acc, cur)=> ({...acc, [cur]: 0}),{})
export const allReactions = Object.keys(reactionDict).map(it => ({name: it, node: reactionDict[it]}))