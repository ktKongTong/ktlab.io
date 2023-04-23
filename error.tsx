import Container from "@/components/container";
import MDContentRender from "./components/MDContentRender";

export default  ()=> {
  return (
    <>
        <Container>
          <MDContentRender docPath={'/404'}/>
        </Container>
    </>
  )
}