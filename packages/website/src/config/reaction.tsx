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

export const defaultReaction = [
  'like','shit', 'wow','celebration'
]

export const allReactions = Object.keys(reactionDict).map(it => ({name: it, node: reactionDict[it]}))