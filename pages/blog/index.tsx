import { PostListLayout } from "~/layouts/ListLayout"

export default function Blog(props:any) {
    return (
      <>
          <ContentQuery path="/blog" sort={ {date: -1} } v-slots={PostListLayout} />
      </>
    )
  }