import PageTitle from "./title"

const Doc = ({ doc }) => {
  return (
    <>
      <PageTitle>{doc.title}</PageTitle>
      <ContentRenderer value={doc} />
    </>
    )
}


export const MDContentRender = ({ docPath }, {slot}) => {
    return <ContentDoc  path={docPath} v-slots={Doc}/>
}

export default MDContentRender