export default function KnowledgeLayout(
{
  children
}:{
  children:React.ReactNode;
}){
  return <main className="flex grow justify-center max-w-[1200px] mx-auto pt-24 w-full space-x-2 ">
    <div className={'grow relative flex w-full justify-center '}>
      {children}
    </div>
  </main>
}