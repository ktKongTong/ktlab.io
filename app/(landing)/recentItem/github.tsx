export interface GithubActivityProps {
  ghType: 'issue' | 'pr' | 'issue-create',
  relateRepo: string
  relateRepoLink: string
  author: string
  authorLink: string
  avatar: string
}

export default function GithubActivity(props: GithubActivityProps) {
  return (
    <div>

    </div>
  )
}

