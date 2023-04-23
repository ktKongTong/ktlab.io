import Container from "@/components/container";
import MDContentRender from "./components/MDContentRender";

export default  ()=> {
  return (
    <>
        <Container>

        {/* <ContentDoc path="/404"/> */}
          <MDContentRender nav={false} className="text-center" docPath={'/404'}/>
        </Container>
    </>
  )
}