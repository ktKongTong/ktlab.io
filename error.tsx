import Container from "@/components/container";
import PostLayout from "@/layouts/PostLayout";

export default  ()=> {
  return (
    <>
        <Container>
          <PostLayout nav={false} className="text-center" docPath={'/404'}/>
        </Container>
    </>
  )
}